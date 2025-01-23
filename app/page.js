// import MarkdocComponent from 'components/MarkdocComponent';
import React from "react";
import { getMarkdownContent } from "./lib/queries";
import { SigilCard } from "./components/SigilCard";
export default async function HomePage() {
  // const homepage = await getMarkdownContent("index.md")

  return (
    <div className="container relative z-[-100] top-0 w-full grow-0 mb-[2.5rem] md:mb-[3.5rem] 2xl:mb-[4.875rem] !mt-[0px]">
      {/* <SigilCard /> */}
      <h1 className="text-size-homepage  inline-block leading-[110%] tracking-[.03em] font-[300]">
        <div className="hidden md:block">

          <span className="">A Change In Strategy, the Urbit project is rebooting.</span>
          <br />
          <span className="">Our vision hasn’t changed, but how we get there has.</span>
          <br />
          <span className="text-gray-87">What’s coming is worth the wait. </span>
          <br />
          <span className="text-gray-87">Sign up below to be the first to know.</span>
        </div>
        <div className="block md:hidden">

          <span className="">A Change In Strategy, the Urbit project is rebooting.
            Our vision hasn’t changed, but how we get there has. </span>
          <span className="text-gray-87">What’s coming is worth the wait.
            Sign up below to be the first to know.</span>
        </div>
      </h1>
    </div>
  );
}
