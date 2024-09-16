// import MarkdocComponent from 'components/MarkdocComponent';
import React from "react";
import { getMarkdownContent, getPostsTree } from './lib/queries';
import Markdoc from '@markdoc/markdoc';
import Link from 'next/link';


// export default async function MyApp({ Component, pageProps }) {
export default async function HomePage({ params }) {
  const config = await getMarkdownContent('config.md');
  const posts = await getPostsTree();
  // const tableOfContents = extractHeadings(content);
  // console.log('c', config.content)
  const components = config.components;
  // console.log('md', Markdoc.renderers);
  // console.log('c', config.postMeta.nav);
  return (
      <div class="m-8">
        <h1 class="mb-4 relative before:content-['~'] before:absolute before:left-[-.8em] before:bottom-[.1em] w-auto">{config.postMeta.headline}</h1>
        <div class="mb-4 flex flex-col text-gray-400">
          {config.postMeta.nav.map((navItem, i) => {
            return (
              <Link key={navItem.title} href={navItem.url} className="" target={navItem.external ? "_blank" : ""}>
                {navItem.title}
              </Link>
            )})}
        </div>
        {/* {Markdoc.renderers.react(config.content, React, { components })} */}
      </div>
  )
}
