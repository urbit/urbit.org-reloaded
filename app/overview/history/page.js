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
        <div className="overview-section-title">organization</div>
        <div className="overview-section-body">The Urbit Foundation↗ was formally established in 2021 when it split off from Tlon. The Foundation leads core development, education, communications, runs the Urbit grants program, maintains urbit.org↗ and Urbit-related media, and organizes events like Assembly↗.
        <br/>
<br/>

Tlon Corporation↗ was founded in 2013 to bootstrap Urbit. Tlon provides a mobile app “Tlon” which serves as the communication suite for Urbit, and, as of 2024, offers free hosting and Urbit planets for anyone who wants to get on the network.
<br/>
<br/>

Tirrel Corporation↗ was founded in 2021 and is currently building a Lightning wallet for using Bitcoin on Urbit.
<br/>
<br/>

Founded in 2022, Native Planet↗ has begun the immensely ambitious task of building hardware for Urbit.
<br/>
<br/>

Zorp↗, founded in 2022, builds Nockchain, a Layer 1 proof of work blockchain built using zero-knowledge proofs.
<br/>
<br/>

Spun out of the redoubtable crypto company Chorus One, in 2023 Red Horizon↗ began providing hosting services and developer tools for Urbit.
<br/>
<br/>

Founded in 2023, Alphabet↗ is building a peer-to-peer prediction market on Urbit leveraging the network’s decentralized structure and built-in reputation system.
<br/>
<br/>

Urbit’s community of contributors and core developers has been steadily contributing to the code base since before the Urbit Foundation existed, and they’re still going strong. They can primarily be found on Urbit itself, in the Urbit Community (~bitbet-bolbel/urbit-community↗), the urbit-dev↗ mailing list and on GitHub↗. See also The Urbit Foundation’s public group at ~halbex-palheb/uf-public↗.</div>
      </section>
      <section className="overview-section">
        <div className="overview-section-title">Timeline</div>
        <div className="overview-section-body">In the beginning, Urbit was just a few people with the right combination of imagination and discipline to try to rebuild computing.
<br/>
<br/>
2002
<br/>
<br/>

Urbit starts as an open-ended personal project. An “independent study PhD” to reinvent computing for a network-centric world.
<br/>
<br/>

2008
<br/>
<br/>

Nock, the foundation of Urbit, works. Coming in at 32 lines of code, that’s 1 line of code every two months.
<br/>
<br/>

2012
<br/>
<br/>

Hoon, Urbit’s programming language, compiles itself to Nock. Writing Hoon is much easier than writing Nock.
<br/>
<br/>

2013
<br/>
<br/>

Arvo, Urbit’s OS kernel, boots and the first live Urbit network is started with a command-line chat.
<br/>
<br/>

2014
<br/>
<br/>

Tlon is founded to help support Urbit development (and is  8 people for the next four years).
<br/>
<br/>

2015
<br/>
<br/>

Urbit has its first web interface and serves its own website.
<br/>
<br/>

2016
<br/>
<br/>

The first sale of Urbit address space sells out in four hours.
<br/>
<br/>

2017
<br/>
<br/>

Urbit’s test network runs for ten months without a reboot. Urbit’s first private sale of address, shared only with its mailing list, sells out in six hours — limit two per person.
<br/>
<br/>

2018
<br/>
<br/>

Tlon sells about 8% of its stake in the network to accelerate Urbit development.
<br/>
<br/>

2019
<br/>
<br/>

Tlon spends the year stabilizing Arvo and building Landscape.
<br/>
<br/>

2021
<br/>
<br/>

Tlon hosts the first Urbit Assembly and the Urbit Foundation is formally organized.
<br/>
<br/>

2022
<br/>
<br/>

The Urbit Foundation’s split from Tlon becomes complete, and UF organizes Urbit NYC↗ and Assembly 2022↗ in Miami while launching the Hoon School Live educational program, and updating the documentation↗.
<br/>
<br/>

2023
<br/>
<br/>

The Urbit Foundation takes over core development of Urbit and organizes the Volcano Summit, a conference for Urbit developers in El Salvador. Later in the year, Assembly Lisboa↗ is our biggest event yet, drawing developers, projects, writers, artists, and Urbit enthusiasts from all over the world.
<br/>
<br/>

The Future
<br/>
<br/>

There’s a lot to be excited about. Ares, the new Urbit runtime, will make Urbit far faster and greatly increase its storage capacity. A full-stack rewrite of Urbit’s networking aims to increase throughput 100–1000x. Free hosting at a larger scale will allow larger quantities of users to join the network. A slew of new Urbit companies are working on everything from Lightning wallets on Urbit to Minecraft-like peer-to-peer games to full-fledged Urbit social networks. Several teams are vying to build the first Urbit blockchain. And all the while, enthusiasm among the community remains high, and Urbit companies are as dedicated and focused as ever.</div>
      </section>

    </div>
  );
}
