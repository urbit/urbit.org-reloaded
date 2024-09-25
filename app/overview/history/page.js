import React from "react";
// import { getMarkdownContent } from "./lib/queries";
import SVG from "react-inlinesvg";
export default async function test() {
  // const config = await getMarkdownContent("overview.md");

  return (
    <div className="container mb-8 mt-12 overview-page">
      <section className="overview-section">
        <div className="overview-section-title"></div>
        <div className="overview-section-body">
        Urbit is an open-source project that anyone can work on. The Urbit Foundation, a non-profit organization, is charged with shepherding the network toward a successful future. <a target="_blank" href="https://tlon.io/">Tlon<span>↗</span></a> was the first private company founded for the purposes of working on Urbit, back in 2013. But now there are several more. These include <a target="_blank" href="https://tirrel.io/">Tirrel<span>↗</span></a>, <a target="_blank" href="https://www.nativeplanet.io/">Native Planet<span>↗</span></a>, <a target="_blank" href="https://redhorizon.com/">Red Horizon<span>↗</span></a>, and others. Beyond that, an ecosystem has sprung up around Urbit that includes <a target="_blank" href="https://assembly.capital/">funds<span>↗</span></a>, <a target="_blank" href="https://labyrinthdao.io/">DAOs<span>↗</span></a>, and <a target="_blank" href="https://marsreview.org/">publications<span>↗</span></a>. And of course there are everyday contributors, many of whom have received <a target="_self" href="https://urbit.org/grants">grants<span>↗</span></a> from the Urbit Foundation.
          <br />
          <br />
          Let’s talk first about these individual groups within the Urbit community, then about the history of the project and how it came to be.

        </div>
      </section>
      <section className="overview-section">
        <div className="overview-section-title"></div>
        <div className="overview-section-body"></div>
      </section>
      <section className="overview-section">
        <div className="overview-section-title"></div>
        <div className="overview-section-body"></div>
      </section>

    </div>
  );
}
