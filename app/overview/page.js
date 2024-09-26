import React from "react";
import { getMarkdownContent } from "../lib/queries";
import SVG from "react-inlinesvg";
import Link from "next/link";
import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/introduction.md");

  
  return (
    <div className="container mb-8 mt-12 overview-page">
      {/* <section className="overview-section">
        <div className="overview-section-title"></div>
        <div className="overview-section-body">
        </div>
      </section> */}
      {Markdoc.renderers.react(pageData.content, React, {  })}

     
    </div>
  );
}
