import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SearchBar } from "./SearchBar";

export function Header() {
  const heroStyle = { ["--hero-url" as string]: `url(${siteConfig.heroImage})` } as React.CSSProperties;
  return (
    <header className="site-header" data-hero style={heroStyle}>
      <div className="container">
        <h1>
          <Link href="/" style={{ color: "inherit" }}>{siteConfig.name}</Link>
        </h1>
        <p className="subtitle">{siteConfig.subtitle}</p>
        <div className="socials">
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <nav className="nav" aria-label="Principal">
          <Link href="/posts">Posts</Link>
          <Link href="/featured">Destacados</Link>
          <Link href="/categories">Categorias</Link>
          <Link href="/archive">Archivo</Link>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
}
