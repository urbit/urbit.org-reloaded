import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import Markdoc from "@markdoc/markdoc";
import { OverviewNav } from "../../components/OverviewNav";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/history.md");

  return (
    <div className="overview-page">
      <div className="absolute hidden md:flex">
      <OverviewNav />
      </div>
      {Markdoc.renderers.react(pageData.content, React)}
    </div>
  );
}
