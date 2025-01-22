// import MarkdocComponent from 'components/MarkdocComponent';
import React from "react";
import { getMarkdownContent } from "./lib/queries";
import { SigilCard } from "./components/SigilCard";
export default async function HomePage() {
  // const homepage = await getMarkdownContent("index.md")

  return (
    <div className="container relative z-[-100] top-0 w-full h-full mb-[4.875rem] !mt-[0px]">
      {/* <SigilCard /> */}
      <h1 className="text-size-homepage inline-block leading-[110%] tracking-[.03em] font-[300]">
      <span className="">A change in strategy, the Urbit project is rebooting.</span>
      <br/>
      <span className="">Our vision hasn’t changed, but how we get there has.</span>
      <br/>
      <span className="text-gray-87">What’s coming is worth the wait. </span>
      <br/>
      <span className="text-gray-87">Sign up below to be the first to know.</span>
      <br/>
      </h1>
    </div>
  );
}
