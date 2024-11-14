import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import Link from "next/link";
import Markdoc from "@markdoc/markdoc";
import { OverviewNav } from "../../components/OverviewNav";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/urbit-os.md");

  return (
    <div className="overview-page">
      <div className="absolute hidden md:flex">
      <OverviewNav />
      </div>
      {Markdoc.renderers.react(pageData.content, React)}
      <section className="md:grid grid-cols-6 my-[5rem]">
        <div className="grid-cols-1"></div>
        <div className="grid-cols-5">
          <Link className="next-button" href="/overview/urbit-id">
            Urbit ID →
          </Link>
        </div>
      </section>
    </div>
  );
}
