import "./globals.css";
import { getMarkdownContent } from "./lib/queries";
import { LayoutSlotsProvider } from "./lib/layoutSlots";
import { LayoutFrame } from "./components/LayoutFrame";

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

  // Load both urbit-explained and running-urbit sections for OverviewSubmenu
  const urbitExplainedConfig = await getMarkdownContent("overview/urbit-explained/config.md");
  const runningUrbitConfig = await getMarkdownContent("overview/running-urbit/config.md");

  // Build section arrays with slugs and titles
  const urbitExplainedSections = [];
  for (const slug of urbitExplainedConfig.frontMatter.sections || []) {
    try {
      const data = await getMarkdownContent(`overview/urbit-explained/${slug}.md`);
      urbitExplainedSections.push({ slug, title: data.frontMatter.title });
    } catch (error) {
      console.error(`Error loading section ${slug}:`, error);
    }
  }

  const runningUrbitSections = [];
  for (const slug of runningUrbitConfig.frontMatter.sections || []) {
    try {
      const data = await getMarkdownContent(`overview/running-urbit/${slug}.md`);
      runningUrbitSections.push({ slug, title: data.frontMatter.title });
    } catch (error) {
      console.error(`Error loading section ${slug}:`, error);
    }
  }

  return (
    <html lang="en" className="light">
      <head>
        <script defer src="/umami-script.js" data-website-id="bf47fa30-3b27-43fc-af86-e6bfcb739881"></script>
        <link
          rel="preload"
          href="/fonts/SLTFSkylingVF.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Awesome Serif VAR-VF.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SpaceMono-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-[100svh] w-full relative" id="observer-root">
        <LayoutSlotsProvider>
          <LayoutFrame
            nav={config.frontMatter?.nav}
            homepage={config.frontMatter?.homepage}
            footerData={config.frontMatter?.footer}
            mobileNav={config.frontMatter?.mobileNav}
            announcements={config.frontMatter?.announcements}
            urbitExplainedSections={urbitExplainedSections}
            runningUrbitSections={runningUrbitSections}
          >
            {children}
          </LayoutFrame>
        </LayoutSlotsProvider>
      </body>
    </html>
  );
}

