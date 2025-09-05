
import React from 'react';
import { StylePreset, Shape, GeneratedImage, GenerationParams } from '../types';
import { STYLE_PRESETS, SHAPES } from '../constants';

interface SidebarProps {
  selectedStyle: StylePreset;
  onStyleSelect: (style: StylePreset) => void;
  selectedShape: Shape;
  onShapeSelect: (shape: Shape) => void;
  history: GeneratedImage[];
  onRecreate: (params: GenerationParams) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedStyle, onStyleSelect, selectedShape, onShapeSelect, history, onRecreate }) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col space-y-6 overflow-y-auto">
      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Style Presets</h3>
        <div className="space-y-2">
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onStyleSelect(preset)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                selectedStyle.name === preset.name
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Base Shape</h3>
        <div className="space-y-2">
           {SHAPES.map((shape) => (
            <button
              key={shape}
              onClick={() => onShapeSelect(shape)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                selectedShape === shape
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0">
         <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">History</h3>
         <div className="space-y-3 overflow-y-auto h-full pr-1">
            {history.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">Your generated logos will appear here.</p>
            ) : (
                history.map(item => (
                    <div key={item.id} className="group relative cursor-pointer" onClick={() => onRecreate(item.params)}>
                        <img 
                            src={`data:image/png;base64,${item.base64}`} 
                            alt="Generated logo" 
                            className="w-full h-auto rounded-md aspect-square object-cover"
                        />
                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity rounded-md">
                            <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100">Recreate</span>
                        </div>
                    </div>
                ))
            )}
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
