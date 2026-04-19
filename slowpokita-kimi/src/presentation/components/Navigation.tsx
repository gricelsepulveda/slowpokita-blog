"use client";
import Link from "next/link";
import { useState } from "react";
import { SearchBox } from "./SearchBox";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-bg-dark/95 backdrop-blur-sm border-b border-bg-light">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-pink">slowpokita</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/posts" className="text-gray-300 hover:text-brand-cyan transition-colors">Posts</Link>
          <Link href="/featured" className="text-gray-300 hover:text-brand-cyan transition-colors">Destacados</Link>
          <Link href="/categories" className="text-gray-300 hover:text-brand-cyan transition-colors">Categorías</Link>
          <Link href="/archive" className="text-gray-300 hover:text-brand-cyan transition-colors">Archivo</Link>
          <SearchBox />
        </div>
        <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "✕" : "☰"}</button>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link href="/posts" className="block text-gray-300 hover:text-brand-cyan">Posts</Link>
          <Link href="/featured" className="block text-gray-300 hover:text-brand-cyan">Destacados</Link>
          <Link href="/categories" className="block text-gray-300 hover:text-brand-cyan">Categorías</Link>
          <Link href="/archive" className="block text-gray-300 hover:text-brand-cyan">Archivo</Link>
          <SearchBox />
        </div>
      )}
    </nav>
  );
}