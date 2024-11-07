// import MarkdocComponent from 'components/MarkdocComponent';
import React from "react";
import { getMarkdownContent } from "./lib/queries";
import { SigilCard } from "./components/SigilCard";
export default async function HomePage() {
  // const homepage = await getMarkdownContent("index.md")

  return (
    <div className="container z-[-100]  absolute top-0 w-full h-full !mt-[0px]">
      <SigilCard />
    </div>
  );
}
