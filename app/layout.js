import "./globals.css";
import { getMarkdownContent } from "./lib/queries";

import { HeaderNav } from "./components/HeaderNav";
import { FooterSection } from "./components/FooterSection";

export async function generateMetadata({ params }, parent) {
  const config = await getMarkdownContent("config.md");

  return {
    title: `${config.frontMatter.title} — ${config.frontMatter.subtitle}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default async function RootLayout({ children }) {
  const config = await getMarkdownContent("config.md");

  return (
    <html lang="en">
      <body className="min-h-[100svh] flex flex-col w-full h-full " id="observer-root">
        <HeaderNav nav={config.frontMatter?.nav} />
        <div className="mt-[var(--header-height)]">{children}</div>
        <FooterSection footerData={config.frontMatter?.footer} />
      </body>
    </html>
  );
}
