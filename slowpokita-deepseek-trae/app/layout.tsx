import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BLOG_TITLE, BLOG_SUBTITLE } from './config';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_SUBTITLE,
  keywords: ['blog', 'tech', 'design', 'coding', 'minimalist'],
  authors: [{ name: BLOG_TITLE }],
  openGraph: {
    type: 'website',
    title: BLOG_TITLE,
    description: BLOG_SUBTITLE,
    siteName: BLOG_TITLE,
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_TITLE,
    description: BLOG_SUBTITLE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}