"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Post } from "@/domain/post";

function resolveImage(post: Post, key: string): string | null {
  const file = post.images?.[key];
  if (!file) return null;
  if (file.startsWith("/") || file.startsWith("http")) return file;
  return `/content/posts/${post.slug}/${file}`;
}

type Node =
  | { kind: "text"; value: string }
  | { kind: "image"; src: string; alt: string };

function parse(post: Post): Node[] {
  const nodes: Node[] = [];
  const regex = /\$(image[a-zA-Z0-9_-]+)/g;
  let last = 0;
  const text = post.content;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push({ kind: "text", value: text.slice(last, m.index) });
    const src = resolveImage(post, m[1]);
    if (src) nodes.push({ kind: "image", src, alt: `${post.title} - ${m[1]}` });
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push({ kind: "text", value: text.slice(last) });
  return nodes;
}

export function PostContent({ post }: { post: Post }) {
  const nodes = useMemo(() => parse(post), [post]);
  const [zoom, setZoom] = useState<string | null>(null);

  const close = useCallback(() => setZoom(null), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, close]);

  return (
    <>
      {nodes.map((n, i) => {
        if (n.kind === "image") {
          return (
            <img
              key={i}
              src={n.src}
              alt={n.alt}
              className="inline-image"
              onClick={() => setZoom(n.src)}
              loading="lazy"
            />
          );
        }
        return n.value.split(/\n{2,}/).map((para, j) => {
          const trimmed = para.trim();
          if (!trimmed) return null;
          return <p key={`${i}-${j}`}>{trimmed}</p>;
        });
      })}

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="close" onClick={close} aria-label="Cerrar">X</button>
          <img src={zoom} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
