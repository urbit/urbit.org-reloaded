import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import Link from "next/link";
import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/urbit-id.md");

  return (
    <div className="container mb-[8rem] md:mb-[13.4rem] mt-12 overview-page">
      {Markdoc.renderers.react(pageData.content, React)}
      <section className="grid grid-cols-6 my-[5rem]">
        <div className="grid-cols-1"></div>
        <div className="grid-cols-5">
          <Link className="next-button" href="/overview/history">
            History →
          </Link>
        </div>
      </section>
    </div>
  );
}
