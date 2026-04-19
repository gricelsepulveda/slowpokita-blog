"use client";

import { useState } from "react";
import { PostDTO } from "@/application/dto/PostDTO";
import { ImageModal } from "./ImageModal";

interface PostContentProps {
  post: PostDTO;
}

export function PostContent({ post }: PostContentProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const parseContent = (content: string) => {
    const parts = content.split(/(\$[a-zA-Z0-9]+)/g);
    return parts.map((part, index) => {
      const match = part.match(/^\$([a-zA-Z0-9]+)$/);
      if (match) {
        const key = match[1];
        const imageFile = post.images[key];
        if (imageFile) {
          const imagePath = `/${post.assetsPath}/${imageFile}`;
          return (
            <figure
              key={index}
              className="my-8 cursor-pointer"
              onClick={() => setModalImage(imagePath)}
            >
              <img
                src={imagePath}
                alt={`Imagen ${key}`}
                className="max-w-md mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </figure>
          );
        }
        return <span key={index}>${key}</span>;
      }
      return (
        <p key={index} className="mb-4 leading-relaxed text-gray-300 whitespace-pre-wrap">
          {part}
        </p>
      );
    });
  };

  return (
    <>
      <div className="prose prose-invert max-w-none">
        {parseContent(post.content)}
      </div>
      <ImageModal
        image={modalImage}
        onClose={() => setModalImage(null)}
      />
    </>
  );
}