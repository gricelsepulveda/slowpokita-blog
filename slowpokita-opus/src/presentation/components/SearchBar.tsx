"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Entry = {
  slug: string;
  title: string;
  category: string;
  hashtags: string[];
  excerpt: string;
  date: string;
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/api/search-index")
      .then(r => r.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.hashtags.some(h => h.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, index]);

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Buscar por titulo, hashtag o categoria..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Buscar posts"
      />
      {results.length > 0 && (
        <div className="search-results" role="listbox">
          {results.map(r => (
            <Link key={r.slug} href={`/post/${r.slug}`} onClick={() => setQuery("")}>
              <strong>{r.title}</strong>
              <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{r.category}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
