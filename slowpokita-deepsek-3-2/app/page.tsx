import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            slowpokita
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Personal blog about web development, programming, and technology
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Featured Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured posts will be rendered here */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Getting Started with Next.js
              </h3>
              <p className="text-gray-300 mb-4">
                A comprehensive guide to building modern web applications
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-accent">Web Development</span>
                <span className="text-sm text-gray-400">8 min read</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-8">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Latest posts will be rendered here */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                TypeScript Best Practices
              </h3>
              <p className="text-gray-300 mb-4">
                Writing clean and maintainable TypeScript code
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-accent">Programming</span>
                <span className="text-sm text-gray-400">12 min read</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}