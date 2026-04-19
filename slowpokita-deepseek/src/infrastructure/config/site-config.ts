export interface SiteConfig {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  author: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
  };
  theme: {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      accent: string;
      text: string;
      textMuted: string;
    };
    fonts: {
      primary: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  title: 'slowpokita',
  subtitle: 'Blog personal sobre tecnología y desarrollo web',
  description: 'Un blog minimalista sobre desarrollo web, arquitectura de software y diseño moderno.',
  url: 'https://slowpokita.com',
  author: 'Slowpokita',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/slowpokita',
    instagram: 'https://instagram.com/slowpokita',
  },
  theme: {
    colors: {
      background: '#1E1B4C',
      primary: '#FF2E97',
      secondary: '#FFD402',
      accent: '#0ABDC6',
      text: '#FFFFFF',
      textMuted: '#A0A0C0',
    },
    fonts: {
      primary: 'Montserrat, sans-serif',
    },
  },
};