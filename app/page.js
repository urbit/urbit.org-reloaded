// import MarkdocComponent from 'components/MarkdocComponent';
import React from "react";
import { getMarkdownContent } from "./lib/queries";
import { SigilCard } from "./components/SigilCard";
export default async function HomePage() {
  // const homepage = await getMarkdownContent("index.md")

  return (
    <div className="container relative z-[-100] top-0 w-full h-full mb-[4.875rem] !mt-[0px]">
      {/* <SigilCard /> */}
      <h1 className="text-2xlarge lg:text-3xlarge xl:text-4xlarge  flex flex-col leading-[110%] tracking-[.03em] font-[300]">
      <span className="whitespace-nowrap">A change in strategy, the Urbit project is rebooting.</span>
      <span className="whitespace-nowrap">Our vision hasn’t changed, but how we get there has.</span>
      <span className="whitespace-nowrap text-gray-87">What’s coming is worth the wait. </span>
      <span className="whitespace-nowrap text-gray-87">Sign up below to be the first to know.</span>
      </h1>
    </div>
  );
}
