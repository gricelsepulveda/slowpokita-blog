'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Star, FolderArchive, Calendar } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/posts', label: 'Posts', icon: null },
  { href: '/featured', label: 'Destacados', icon: Star },
  { href: '/categories', label: 'Categorías', icon: FolderArchive },
  { href: '/archive', label: 'Archivo', icon: Calendar },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#1E1B4C]/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF2E97] to-[#0ABDC6]">
              slowpokita
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {Icon && <Icon size={18} />}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}