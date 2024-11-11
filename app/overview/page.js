import React from "react";
import { getMarkdownContent } from "../lib/queries";
import Link from "next/link";

import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/introduction.md");

  return (
    <div className="overview-page">
    
      {Markdoc.renderers.react(pageData.content, React)}
      <section className="md:grid grid-cols-6 my-[5rem]">
        <div className="grid-cols-1"></div>
        <div className="grid-cols-5">
          <Link className="next-button" href="/overview/urbit-os">
            Urbit OS →
          </Link>
        </div>
      </section>
    </div>
  );
}
