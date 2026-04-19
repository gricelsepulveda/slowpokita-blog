export const siteConfig = {
  name: "slowpokita",
  subtitle: "Cronicas lentas desde algun rincon de Latinoamerica",
  url: "https://slowpokita.example",
  locale: "es-LA",
  heroImage: "/hero.jpg",
  social: {
    linkedin: "https://www.linkedin.com/in/slowpokita",
    instagram: "https://www.instagram.com/slowpokita"
  },
  seo: {
    defaultTitle: "slowpokita",
    defaultDescription:
      "Blog personal minimalista: ensayos, apuntes y fotos desde Latinoamerica.",
    twitterHandle: "@slowpokita"
  }
} as const;

export type SiteConfig = typeof siteConfig;
