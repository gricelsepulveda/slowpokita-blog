import { siteConfig } from '@infrastructure/config/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF2E97] to-[#0ABDC6]">
                {siteConfig.title}
              </span>
            </h3>
            <p className="text-gray-400">{siteConfig.subtitle}</p>
          </div>

          <div className="flex space-x-6">
            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© {currentYear} {siteConfig.title}. Todos los derechos reservados.</p>
          <p className="mt-2">Construido con Next.js, TypeScript y arquitectura hexagonal.</p>
        </div>
      </div>
    </footer>
  );
}