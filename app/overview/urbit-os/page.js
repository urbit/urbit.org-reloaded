import React from "react";
// import { getMarkdownContent } from "./lib/queries";
import SVG from "react-inlinesvg";
import Link from "next/link";
export default async function test() {
  // const config = await getMarkdownContent("overview.md");

  return (
    <div className="mb-8 ml-[3rem] mt-12 ">
      <section className="grid grid-cols-6 gap-4 mb-[8rem]">
        <div className="col-span-1"></div>
        <div className="col-span-4 text-25px leading-120">
          Urbit OS
        </div>
      </section>

      <section className="grid grid-cols-6 gap-4 mt-[4rem] mb-[12rem]">
        <div className="col-span-1"></div>
        <div className="col-span-4 text-25px leading-120">
          <Link className="next-button" href="/overview/urbit-id">Urbit ID →</Link>    
        </div>
      </section>
    </div>
  );
}
