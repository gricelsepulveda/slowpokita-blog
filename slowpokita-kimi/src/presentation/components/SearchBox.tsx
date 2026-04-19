"use client";

import { useState } from "react";
import Link from "next/link";
import { container } from "@/infrastructure/di/container";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const posts = await container.searchPosts.execute(value);
    setResults(posts);
    setShowResults(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar..."
        className="bg-bg-light text-white px-4 py-2 rounded-lg border border-brand-cyan/30 focus:border-brand-cyan outline-none w-full md:w-64"
      />
      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-bg-light rounded-lg shadow-xl border border-bg-light z-50 max-h-96 overflow-auto">
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="block p-3 hover:bg-brand-cyan/10 border-b border-bg last:border-0"
              onClick={() => setShowResults(false)}
            >
              <div className="text-brand-pink font-medium text-sm">{post.title}</div>
              <div className="text-gray-400 text-xs">{post.category}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}