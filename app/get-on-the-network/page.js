import React from "react";
import { getMarkdownContent } from "../lib/queries";
import Link from "next/link";

import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("get-on-the-network.md");

  return (
    <div className="container mb-[8rem] md:mb-[13.4rem] mt-12 overview-page">
      {Markdoc.renderers.react(pageData.content, React)}
    </div>
  );
}
