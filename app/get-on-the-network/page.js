import React from "react";
import { getMarkdownContent } from "../lib/queries";
import Link from "next/link";

import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("get-on-the-network.md");

  return (
    <div className="template_get-on-the-network container mb-[8rem] md:mb-[13.4rem] mt-9 overview-page">
      <div className="md:grid grid-cols-6 gap-x-4 w-full mb-16 text-xlarge">
        <div className="col-span-5 col-start-2">
          Get on the network in seconds through a hosting provider, or run Urbit yourself.
        </div>
      </div>
      {Markdoc.renderers.react(pageData.content, React)}
    </div>
  );
}
