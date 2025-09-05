
import React from 'react';
import { GenerationParams, AspectRatio } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { ZapIcon } from './icons/Icons';

interface SettingsPanelProps {
  params: GenerationParams;
  onParamsChange: <K extends keyof GenerationParams,>(key: K, value: GenerationParams[K]) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ params, onParamsChange, onGenerate, isLoading }) => {
    
    const Label: React.FC<{ htmlFor: string, children: React.ReactNode }> = ({ htmlFor, children }) => (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
    );

    const TextInput: React.FC<{id: string, value: string, onChange: (val: string) => void}> = ({id, value, onChange}) => (
        <input 
            type="text" 
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
        />
    );

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-4 flex flex-col space-y-4 overflow-y-auto">
      <h3 className="text-lg font-bold">Parameters</h3>
      
      <div>
        <Label htmlFor="brandName">Brand Name</Label>
        <TextInput id="brandName" value={params.brandName} onChange={(val) => onParamsChange('brandName', val)} />
      </div>
      
      <div>
        <Label htmlFor="description">Description / Intent</Label>
        <textarea 
            id="description"
            rows={3}
            value={params.description}
            onChange={(e) => onParamsChange('description', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
      </div>

      <div>
        <Label htmlFor="negativePrompt">Negative Prompt</Label>
        <TextInput id="negativePrompt" value={params.negativePrompt} onChange={(val) => onParamsChange('negativePrompt', val)} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <input type="color" id="primaryColor" value={params.primaryColor} onChange={(e) => onParamsChange('primaryColor', e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer"/>
        </div>
        <div className="flex-1">
            <Label htmlFor="accentColor">Accent Color</Label>
            <input type="color" id="accentColor" value={params.accentColor} onChange={(e) => onParamsChange('accentColor', e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer"/>
        </div>
      </div>

      <div>
        <Label htmlFor="aspectRatio">Aspect Ratio</Label>
        <select id="aspectRatio" value={params.aspectRatio} onChange={(e) => onParamsChange('aspectRatio', e.target.value as AspectRatio)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            {ASPECT_RATIOS.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
        </select>
      </div>

       <div>
        <Label htmlFor="variations">Variations ({params.variations})</Label>
        <input 
            type="range"
            id="variations"
            min="1" max="4"
            value={params.variations}
            onChange={(e) => onParamsChange('variations', parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <div className="flex-grow"></div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
      >
        <ZapIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </aside>
  );
};

export default SettingsPanel;
