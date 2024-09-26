import React from "react";
import { getMarkdownContent } from "../lib/queries";
import Link from "next/link";

import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/introduction.md");

  return (
    <div className="container mb-8 mt-12 overview-page">
    
      {Markdoc.renderers.react(pageData.content, React)}
      <section className="overview-section md:mt-[4rem] md:mb-[12rem]">
        <div className="overview-section-title"></div>
        <div className="overview-section-body">
          <Link className="next-button" href="/overview/urbit-os">
            Urbit OS →
          </Link>
        </div>
      </section>
    </div>
  );
}
