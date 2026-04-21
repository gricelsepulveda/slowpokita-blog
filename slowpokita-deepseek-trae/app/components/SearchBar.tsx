'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  hashtags: string[];
  excerpt: string;
  date: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search results when debounced query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setSelectedIndex(-1);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        setResults(data.results || []);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setSelectedIndex(-1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  // Scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      router.push(`/posts?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleResultClick = useCallback(() => {
    setShowResults(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showResults) return;

      if (e.key === 'Escape') {
        setShowResults(false);
        inputRef.current?.focus();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const result = results[selectedIndex];
        if (result) {
          handleResultClick();
          router.push(`/post/${result.slug}`);
        }
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      (inputElement as any).addEventListener('keydown', handleKeyDown);
      return () => (inputElement as any).removeEventListener('keydown', handleKeyDown);
    }
  }, [showResults, results, selectedIndex, router, handleResultClick]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleInputFocus = () => {
    if (query.trim() && results.length > 0) {
      setShowResults(true);
    }
  };

  const handleViewAllClick = () => {
    setShowResults(false);
    if (query.trim()) {
      router.push(`/posts?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-accent/20 text-foreground font-medium">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div ref={wrapperRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search posts, tags, categories..."
          className="w-full px-4 py-2 pl-10 bg-background-light border border-border rounded-full text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Search posts"
          aria-expanded={showResults}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-accent"
          aria-label="Search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {showResults && (query.trim() || results.length > 0) && (
        <div
          id="search-results"
          ref={resultsRef}
          className="absolute top-full mt-2 w-full bg-background-light border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto"
          role="listbox"
          aria-label="Search results"
        >
          {isLoading ? (
            <div className="p-4 text-center text-muted">
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-accent border-t-transparent"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={`/post/${result.slug}`}
                  onClick={handleResultClick}
                  className={`block px-4 py-3 border-b border-border last:border-b-0 transition-colors ${
                    index === selectedIndex
                      ? 'bg-background-dark'
                      : 'hover:bg-background-dark'
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-foreground truncate">
                      {getHighlightedText(result.title, query)}
                    </h4>
                    <span className="text-xs text-muted bg-background-dark px-2 py-1 rounded-full whitespace-nowrap ml-2 flex-shrink-0">
                      {result.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1 line-clamp-2">{result.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.hashtags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-accent bg-background-dark px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
              <div className="px-4 py-3 border-t border-border">
                <button
                  onClick={handleViewAllClick}
                  className="w-full text-center text-accent hover:text-primary font-medium py-1"
                >
                  View all {results.length} result{results.length !== 1 ? 's' : ''} →
                </button>
              </div>
            </div>
          ) : query.trim() && !isLoading ? (
            <div className="p-4 text-center text-muted">
              <p>No posts found for &quot;{query}&quot;</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}