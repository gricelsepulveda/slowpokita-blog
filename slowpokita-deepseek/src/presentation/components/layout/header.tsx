'use client';

import { siteConfig } from '@infrastructure/config/site-config';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background image/pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1E1B4C] via-[#2A2766] to-[#1E1B4C] opacity-90"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 46, 151, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(10, 189, 198, 0.1) 0%, transparent 50%)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF2E97] via-[#FFD402] to-[#0ABDC6]">
            {siteConfig.title}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {siteConfig.subtitle}
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar posts por título, categoría o hashtags..."
              className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF2E97] focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Social links */}
        <div className="flex justify-center space-x-6">
          <a
            href={siteConfig.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href={siteConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <span className="text-sm font-medium">Instagram</span>
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1E1B4C] to-transparent" />
    </header>
  );
}