import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/history.md");

  return (
    <div className="overview-page">
      {Markdoc.renderers.react(pageData.content, React)}
    </div>
  );
}
