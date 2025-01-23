import "./globals.css";
import { getMarkdownContent } from "./lib/queries";

import { HeaderNav } from "./components/HeaderNav";
import { FooterSection } from "./components/FooterSection";

export async function generateMetadata({ params }, parent) {
  const config = await getMarkdownContent("config.md");
  const metadata = config.frontMatter.site_metadata;
  
  return {
    title: `${config.frontMatter.title} — ${config.frontMatter.subtitle}`,
    description: `${config.frontMatter?.description}`,
    openGraph: {
        images: [
            {
                url: `${metadata.meta_image}`,
                alt: `${metadata.meta_image_alt}`,
                width: 1200,
                height: 630,
            },
        ]
    },
  };
}

export default async function RootLayout({ children }) {
  const config = await getMarkdownContent("config.md");

  return (
    <html lang="en">
      <body className="min-h-[100svh] flex flex-col w-full relative" id="observer-root">
        <div className="w-[100%] flex-grow flex justify-center container">
        <HeaderNav homepage={config.frontMatter?.homepage} nav={config.frontMatter?.nav} />
        </div>
        <div className="h-full mt-[var(--header-height)] z-[1]">{children}</div>
        <FooterSection footerData={config.frontMatter?.footer} />
      </body>
    </html>
  );
}
