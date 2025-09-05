
import { StylePreset, AspectRatio, Shape } from './types';

export const STYLE_PRESETS: StylePreset[] = [
  { name: 'Minimalist', positivePrompt: 'minimalist logo, clean lines, simple, elegant, flat design', negativePrompt: 'complex, cluttered, detailed, noisy' },
  { name: 'Vintage', positivePrompt: 'vintage logo, retro, classic, distressed texture, emblem', negativePrompt: 'modern, clean, glossy, futuristic' },
  { name: 'Modern Tech', positivePrompt: 'modern tech logo, futuristic, geometric, bold, gradient, sleek', negativePrompt: 'old, classic, hand-drawn' },
  { name: 'Mascot', positivePrompt: 'mascot logo, character design, fun, friendly, detailed illustration', negativePrompt: 'abstract, simple, geometric' },
  { name: 'Line-Art', positivePrompt: 'line-art logo, monoline, clean, outline, single weight line', negativePrompt: 'filled, shaded, gradient' },
  { name: 'Gradient', positivePrompt: 'gradient logo, vibrant colors, smooth transition, modern', negativePrompt: 'flat, single color, retro' },
  { name: 'Monogram', positivePrompt: 'monogram logo, intertwined letters, elegant, typographic', negativePrompt: 'pictorial, mascot, illustrative' },
];

export const ASPECT_RATIOS: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export const SHAPES: Shape[] = ['None', 'Circle', 'Shield', 'Hexagon', 'Badge'];

export const FORBIDDEN_KEYWORDS: string[] = [
    'google', 'facebook', 'apple', 'amazon', 'microsoft', 'twitter', 'instagram', 
    'disney', 'nike', 'adidas', 'coca-cola', 'pepsi', 'mcdonalds', 'starbucks', 'tesla'
];
