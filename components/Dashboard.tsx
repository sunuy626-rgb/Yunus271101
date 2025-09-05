
import React, { useState, useCallback } from 'react';
import { GenerationParams, GeneratedImage, StylePreset, Shape, AspectRatio } from '../types';
import { FORBIDDEN_KEYWORDS, STYLE_PRESETS } from '../constants';
import { generateLogos } from '../services/geminiService';
import Sidebar from './Sidebar';
import SettingsPanel from './SettingsPanel';
import Canvas from './Canvas';
import Header from './Header';
import Footer from './Footer';

const Dashboard: React.FC = () => {
    const [params, setParams] = useState<GenerationParams>({
        brandName: 'Quantum',
        description: 'A futuristic tech company',
        style: STYLE_PRESETS[2],
        primaryColor: '#3b82f6',
        accentColor: '#10b981',
        shape: 'Hexagon',
        negativePrompt: 'blurry, ugly, deformed',
        aspectRatio: '1:1',
        variations: 2,
    });
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<GeneratedImage[]>([]);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        const fullPromptText = `${params.brandName} ${params.description}`.toLowerCase();
        const forbiddenWord = FORBIDDEN_KEYWORDS.find(word => fullPromptText.includes(word));

        if (forbiddenWord) {
            setError(`Prompt contains a forbidden brand name: "${forbiddenWord}". Please remove it and try again.`);
            setIsLoading(false);
            return;
        }

        try {
            const imageBytesArray = await generateLogos(params);
            const newImages: GeneratedImage[] = imageBytesArray.map((base64) => ({
                id: crypto.randomUUID(),
                base64,
                prompt: 'Generated Logo',
                params: { ...params }
            }));
            setGeneratedImages(newImages);
            setHistory(prev => [...newImages, ...prev]);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [params]);

    const updateParams = <K extends keyof GenerationParams,>(key: K, value: GenerationParams[K]) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    const handleStyleSelect = (style: StylePreset) => updateParams('style', style);
    const handleShapeSelect = (shape: Shape) => updateParams('shape', shape);
    const handleRecreate = (recreateParams: GenerationParams) => {
        setParams(recreateParams);
        handleGenerate();
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar 
                    selectedStyle={params.style} 
                    onStyleSelect={handleStyleSelect}
                    selectedShape={params.shape}
                    onShapeSelect={handleShapeSelect}
                    history={history}
                    onRecreate={handleRecreate}
                />
                <main className="flex-1 flex flex-col overflow-y-auto">
                   <Canvas 
                        images={generatedImages}
                        isLoading={isLoading}
                        error={error}
                    />
                </main>
                <SettingsPanel 
                    params={params}
                    onParamsChange={updateParams}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
