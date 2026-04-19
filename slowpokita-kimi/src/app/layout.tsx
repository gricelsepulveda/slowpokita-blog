import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/presentation/components/Header";
import { Navigation } from "@/presentation/components/Navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "slowpokita | Reflexiones de una mente lenta pero profunda",
  description: "Blog personal sobre tecnología, cultura y reflexiones cotidianas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-sans bg-bg text-white min-h-screen">
        <Header />
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}