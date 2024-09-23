// import MarkdocComponent from 'components/MarkdocComponent';
import React from "react";
import { getMarkdownContent } from "./lib/queries";

export default async function HomePage() {
  const homepage = await getMarkdownContent("index.md")

  return (
    <div className="container pt-header">
       {/* <div className="mb-4 flex flex-col text-gray-400"> */}
        {/* {homepage.frontMatter.sections.map((section, i) => {
          return <div>
            section block {i}
            </div>
        })} */}
    </div>
  );
}
