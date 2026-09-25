/// <reference types="vitest" />
/// <reference types="vite/client" />

import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import portfolio from "./src/config/portfolio";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

/**
 * Injects every SEO / social / structured-data tag into index.html from the
 * single portfolio config, so rebranding the site never means touching HTML.
 */
function portfolioSeo(): Plugin {
  const s = portfolio.seo;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: s.author,
    jobTitle: s.person.jobTitle,
    url: s.url,
    image: s.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: s.person.addressLocality,
      addressCountry: s.person.addressCountry,
    },
    knowsAbout: s.person.knowsAbout,
    sameAs: s.person.sameAs,
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: s.website.name,
    url: s.url,
    inLanguage: s.website.inLanguage,
    description: s.website.description,
    publisher: { "@type": "Person", name: s.author },
  };

  return {
    name: "portfolio-seo",
    transformIndexHtml() {
      const head = (tag: string, attrs: Record<string, string | boolean>, children?: string) => ({
        tag,
        attrs,
        children,
        injectTo: "head" as const,
      });

      return [
        head("title", {}, s.title),
        head("link", { rel: "canonical", href: s.url }),
        head("link", { rel: "icon", type: "image/png", href: s.favicon }),
        head("meta", { name: "robots", content: s.robots }),
        head("meta", { name: "author", content: s.author }),
        head("meta", { name: "theme-color", content: s.themeColor }),
        head("meta", { name: "title", content: s.metaTitle }),
        head("meta", { name: "description", content: s.description }),
        head("meta", { name: "keywords", content: s.keywords }),

        // Open Graph
        head("meta", { property: "og:type", content: "website" }),
        head("meta", { property: "og:url", content: s.url }),
        head("meta", { property: "og:site_name", content: s.siteName }),
        head("meta", { property: "og:locale", content: s.lang.replace("-", "_") }),
        head("meta", { property: "og:title", content: s.metaTitle }),
        head("meta", { property: "og:description", content: s.description }),
        head("meta", { property: "og:image", content: s.image }),
        head("meta", { property: "og:image:alt", content: s.imageAlt }),

        // Twitter
        head("meta", { name: "twitter:card", content: "summary_large_image" }),
        head("meta", { name: "twitter:url", content: s.url }),
        head("meta", { name: "twitter:title", content: s.metaTitle }),
        head("meta", { name: "twitter:description", content: s.description }),
        head("meta", { name: "twitter:image", content: s.image }),

        // Fonts
        ...s.fonts.map((f) => head("link", { ...f })),

        // Structured data
        head("script", { type: "application/ld+json" }, JSON.stringify(personLd)),
        head("script", { type: "application/ld+json" }, JSON.stringify(websiteLd)),
      ];
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  plugins: [react(), portfolioSeo()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
