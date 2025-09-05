
import React from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon, ImagePlusIcon } from './icons/Icons';

interface CanvasProps {
    images: GeneratedImage[];
    isLoading: boolean;
    error: string | null;
}

const downloadImage = (base64: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64}`;
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


const Canvas: React.FC<CanvasProps> = ({ images, isLoading, error }) => {
    
    const Placeholder = () => (
        <div className="text-center text-gray-500 dark:text-gray-400">
            <ImagePlusIcon className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Your logos will appear here</h2>
            <p className="mt-1">Adjust the settings and click 'Generate' to start.</p>
        </div>
    );
    
    const Loader = () => (
        <div className="text-center">
             <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <p className="mt-4 text-lg">Generating your masterpiece...</p>
            <p className="text-sm text-gray-500">This may take a moment.</p>
        </div>
    );

    const ErrorDisplay = () => (
        <div className="text-center text-red-500 bg-red-500/10 p-4 rounded-lg">
            <h3 className="font-bold">Generation Failed</h3>
            <p className="text-sm">{error}</p>
        </div>
    );

    const ImageCard: React.FC<{ image: GeneratedImage }> = ({ image }) => (
        <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg">
            <img src={`data:image/png;base64,${image.base64}`} alt="Generated logo" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                    onClick={() => downloadImage(image.base64, `${image.params.brandName}-logo`)}
                    className="flex items-center gap-2 text-white bg-blue-500/80 hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-semibold"
                >
                    <DownloadIcon className="w-4 h-4" />
                    Download PNG
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
            {isLoading ? <Loader /> :
             error ? <ErrorDisplay /> :
             images.length === 0 ? <Placeholder /> :
             (
                <div className={`grid gap-6 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} max-w-4xl mx-auto`}>
                    {images.map(img => <ImageCard key={img.id} image={img} />)}
                </div>
             )
            }
        </div>
    );
};

export default Canvas;
