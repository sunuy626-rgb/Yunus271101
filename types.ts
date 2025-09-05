
export type StylePreset = {
  name: string;
  positivePrompt: string;
  negativePrompt: string;
};

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export type Shape = 'None' | 'Circle' | 'Shield' | 'Hexagon' | 'Badge';

export type GenerationParams = {
  brandName: string;
  description: string;
  style: StylePreset;
  primaryColor: string;
  accentColor: string;
  shape: Shape;
  negativePrompt: string;
  aspectRatio: AspectRatio;
  variations: number;
};

export type GeneratedImage = {
  id: string;
  base64: string;
  prompt: string;
  params: GenerationParams;
};
