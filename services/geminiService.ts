
import { GoogleGenAI } from "@google/genai";
import { GenerationParams } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (params: GenerationParams): string => {
    const { brandName, description, style, primaryColor, accentColor, shape, negativePrompt } = params;

    const shapePrompt = shape !== 'None' ? ` in a ${shape.toLowerCase()} shape` : '';
    
    const finalPrompt = `${style.positivePrompt} for brand "${brandName}"${shapePrompt}, representing ${description}. 
    Main color: ${primaryColor}, accent color: ${accentColor}.
    Vector look, strong silhouette, scalable, balanced composition, crisp edges.
    --aspect ${params.aspectRatio} --style raw
    --no ${style.negativePrompt}, ${negativePrompt}, text, words, letters, trademarked names, watermark, low quality, noisy, artifacts`;

    return finalPrompt.replace(/\s+/g, ' ').trim();
};

export const generateLogos = async (params: GenerationParams) => {
    const prompt = buildPrompt(params);

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: params.variations,
                outputMimeType: 'image/png',
                aspectRatio: params.aspectRatio,
            },
        });
        
        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("API did not return any images.");
        }

        return response.generatedImages.map(img => img.image.imageBytes);

    } catch (error) {
        console.error("Error generating logos with Gemini API:", error);
        throw new Error("Failed to generate logos. Please check the console for details.");
    }
};
