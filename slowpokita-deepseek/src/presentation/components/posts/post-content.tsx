'use client';

import { useState } from 'react';
import ImageModal from '../ui/image-modal';

interface PostContentProps {
  content: string;
  images: Record<string, string>;
  assetsPath: string;
}

export default function PostContent({ content, images, assetsPath }: PostContentProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const renderContent = () => {
    const lines = content.split('\n');
    const renderedLines: React.ReactNode[] = [];

    lines.forEach((line, lineIndex) => {
      // Check if line contains image placeholder like $image1
      const imageMatch = line.match(/\$(\w+)/);
      
      if (imageMatch) {
        const imageKey = imageMatch[1];
        const imageFile = images[imageKey];
        
        if (imageFile) {
          const imageSrc = `${assetsPath}/${imageFile}`;
          
          renderedLines.push(
            <div key={`image-${lineIndex}`} className="my-8">
              <div className="relative group cursor-pointer" onClick={() => setModalImage(imageSrc)}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E97]/20 to-[#0ABDC6]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={imageSrc}
                  alt={`Image ${imageKey}`}
                  className="w-full max-w-2xl mx-auto rounded-lg border border-white/10"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white">
                    Click para ampliar
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          renderedLines.push(
            <p key={`text-${lineIndex}`} className="my-4 text-gray-400">
              [Imagen no encontrada: {imageKey}]
            </p>
          );
        }
      } else if (line.trim() === '') {
        renderedLines.push(<div key={`empty-${lineIndex}`} className="h-4" />);
      } else {
        renderedLines.push(
          <p key={`text-${lineIndex}`} className="my-4 text-gray-300 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return renderedLines;
  };

  return (
    <>
      <div className="prose prose-lg max-w-none text-gray-300">
        {renderContent()}
      </div>

      <ImageModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        imageSrc={modalImage || ''}
      />
    </>
  );
}