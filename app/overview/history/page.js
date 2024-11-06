import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/history.md");

  return (
    <div className="container mb-[8rem] md:mb-[13.4rem] mt-9 overview-page">
      {Markdoc.renderers.react(pageData.content, React)}
    </div>
  );
}
