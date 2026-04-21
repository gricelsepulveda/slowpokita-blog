'use client';

import { Post } from '../../src/domain/models/post';
import { useState } from 'react';
import Image from 'next/image';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  const openLightbox = (imageKey: string) => {
    const image = post.images?.[imageKey];
    if (image) {
      setLightboxImage(image);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  const paragraphs = post.content.split('\\n\\n').map((para, idx) => {
    const parts = para.split(/(\$image\d+)/g);
    return (
      <p key={idx} className="mb-6">
        {parts.map((part, i) => {
          if (part.startsWith('$image') && post.images?.[part]) {
            const image = post.images[part];
            return (
              <div key={i} className="my-8 text-center">
                <button
                  onClick={() => openLightbox(part)}
                  className="block w-full max-w-2xl mx-auto cursor-zoom-in"
                >
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                </button>
                {image.caption && (
                  <p className="text-muted text-sm mt-2">{image.caption}</p>
                )}
              </div>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  });

  return (
    <>
      <div className="prose prose-lg max-w-none text-foreground">
        {paragraphs}
      </div>

      {lightboxOpen && lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeLightbox}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="max-w-4xl max-h-full">
            <div className="relative h-full">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {lightboxImage.caption && (
              <p className="text-white text-center mt-4">{lightboxImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}