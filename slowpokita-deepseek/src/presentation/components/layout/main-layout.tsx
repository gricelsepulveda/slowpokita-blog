import { ReactNode } from 'react';
import Header from './header';
import Navigation from './navigation';
import Footer from './footer';

interface MainLayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export default function MainLayout({ children, onSearch }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1E1B4C] text-white font-sans">
      <Navigation />
      <Header onSearch={onSearch} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}