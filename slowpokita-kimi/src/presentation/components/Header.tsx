import { siteConfig } from "@/infrastructure/config/site";

export function Header() {
  return (
    <header className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-bg-light to-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/header-bg.jpg')] bg-cover bg-center opacity-20" />
      </div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          {siteConfig.title}
        </h1>
        <p className="text-lg md:text-xl text-brand-cyan max-w-xl">
          {siteConfig.subtitle}
        </p>
        <div className="flex gap-6 mt-8 justify-center">
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:text-brand-yellow transition-colors font-medium">LinkedIn</a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:text-brand-yellow transition-colors font-medium">Instagram</a>
        </div>
      </div>
    </header>
  );
}