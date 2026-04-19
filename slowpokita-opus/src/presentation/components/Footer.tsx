import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        (c) {new Date().getFullYear()} {siteConfig.name}. Hecho con lentitud en Latinoamerica.
      </div>
    </footer>
  );
}
