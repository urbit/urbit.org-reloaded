import React from "react";
// import { getMarkdownContent } from "./lib/queries";
import SVG from "react-inlinesvg";
import Link from "next/link";
export default async function test() {
  // const config = await getMarkdownContent("overview.md");

  return (
    <div className="container mb-8 mt-12 overview-page">
      <section className="overview-section">
        <div className="overview-section-title">Urbit ID</div>
        <div className="overview-section-body">
          Assuming Urbit OS is simple enough for an ordinary user to own and
          operate, how do they log in? How do people identify one another on
          this new network? When people want to get data, files and messages to
          one another, how do they do it? And how do we prevent spam?
          <br />
          <br />
          Urbit ID is the answer to all these questions. Urbit ID is a
          decentralized addressing and public key infrastructure designed for
          Urbit OS.
          <br />
          <br />
          Let’s talk first about what an Urbit ID is and what it does. Then
          we’ll cover our design goals and how the system works overall.
          <div className="img-container">
            <img
              src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-cards%402x.png"
            ></img>
          </div>
        </div>
      </section>
      <section className="overview-section">
        <div className="overview-section-title">Summary</div>
        <div className="overview-section-body">
          Your Urbit ID is a short, four-syllable name like ~ravmel-ropdyl that
          you own with an eight-syllable master passkey like
          ~palfun-foslup-fallyn-balfus. This name and key lets you log into
          Urbit OS, and it’s used to encrypt packets you send over the Urbit
          network. Soon it will also be a master key that allows holding and
          sending of Bitcoin and other cryptocurrencies. Your Urbit ID and
          passkey belong to you like any other cryptographic assets. No one can
          take them away from you (just make sure to store the key safely).
          <br />
          <br />
          The Urbit ID registry is live and deployed to the Ethereum blockchain.
          Urbit ID isn’t specifically wedded to Ethereum – someday we’d like it
          to be hosted by Urbit OS itself. Also, Urbit ID is the only component
          of the stack using Ethereum – your Urbit OS node is hosted wherever
          you choose. The primary function of the Urbit ID registry is to keep
          track of who owns what, to specify which keys are associated with
          which names, and to enforce the rules of address distribution.
          <br />
          <br />
          Each Urbit ID is really just a number. From that number we generate a
          pronounceable name and a visually identifiable sigil. ~dalwel-fadrun
          is 3,509,632,436, for example.
          <br />
          <br />
          Urbit IDs are distributed by a sponsorship tree. At the top of the
          tree are 28 (256) galaxies. Each galaxy issues 28 stars, making a
          total of 216 (65K). Stars then each can issue 216 planets, making for
          232 (~4B). As you might expect, each planet issues 232 moons.
          <div className="img-container">
            <img
              src="https://media.urbit.org/site/overview/overview-id.png"
              className=""
            ></img>
          </div>
          You can also call stars ‘infrastructure nodes’ and galaxies
          ‘governance nodes’, since those are more descriptive names for their
          roles. Stars help route packets, kind of like an ISP. And galaxies are
          a bit like DNS root servers or ICANN members. The difference, of
          course, is that Urbit IDs are owned cryptographically by many
          different people and accrue reputation independently.
        </div>
      </section>
      <section className="overview-section">
        <div className="overview-section-title">Design</div>
        <div className="overview-section-body">
          At a high level, there are three important things to understand about
          the overall Urbit ID system design.
          <br />
          <br />
          First, scarcity: there are only 232 (~4B) Urbit IDs, so they cost
          something. Since they cost something, people are less likely to use
          them to spam or abuse the network. When you meet a stranger with an
          Urbit ID, you know they have some skin in the game (even without
          leaking personal data in either direction). That said, each Urbit ID
          is purely pseudonymous, so ~dalwel-fadrun for example, is proof of
          some stake in the network, but not much more.
          <br />
          <br />
          Second, decentralization: Urbit IDs are distributed by a sponsorship
          tree. Each sponsor issues a fixed number of addresses. Since there are
          lots of sponsors, there are lots of ways to get an Urbit ID — not just
          one central authority. Once you get one, it’s yours forever.
          <br />
          <br />
          One point that’s useful to understand about sponsors is that while
          Urbit IDs always need a sponsor, or parent node on the network
          (primarily for peer discovery), it’s always possible to change
          sponsors and sponsors can always reject children. This means bad
          actors can be banned and abusive sponsors can be ignored. We think
          this strikes a nice balance between accountability and freedom.
          <br />
          <br />
          Third, governance: galaxies (the top of the sponsorship tree) form a
          senate that can upgrade the logic of the Urbit ID system by majority
          vote. We think Urbit ID will last for quite a long time, but if it
          ever needs to be updated, the galaxies can vote to approve, reject, or
          propose changes to the contracts. Code may be law, but ultimately we
          acknowledge that human judgment can’t be factored out.
          <br />
          <br />
          The Urbit ID sponsorship tree is not intended to be a social system in
          any way. Interactions between people and communities on the Urbit
          network are peer-to-peer, entirely organic and completely uncontrolled
          by the address hierarchy. Urbit ID is simply an authentication
          substrate upon which reputation and communication systems can be
          built. (We’ve even considered renaming stars and galaxies
          ‘infrastructure’ and ‘governance’ nodes, respectively.)
          <br />
          <br />
          Your relationship with your sponsor should be sort of like your ISP or
          a utility provider: a passive, non-invasive relationship. If it isn’t
          to your liking, moving to a new sponsor is very easy.
        </div>
      </section>
      <section className="overview-section">
        <div className="overview-section-title">Digital Land</div>
        <div className="overview-section-body">
          Urbit IDs are property, and we think of the entire registry of Urbit
          IDs as a vast territory of digital land.
          <div className="img-container">
            <img
              src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-sigils%402x.png"
              className=""
            ></img>
          </div>
          The scarcity of Urbit ID address space gives it value and that in turn
          helps bootstrap decentralization even while the project is young.
          Broad distribution is important – if Urbit is going to last a long
          time and succeed as neutral infrastructure, it has to be owned and
          controlled by a wide variety of people.
          <br />
          <br />
          When we launched the Urbit ID system, in January of 2019, there were a
          couple thousand different star and galaxy holders acting as stewards
          of this digital land. Since then, that number has been steadily on the
          rise.
          <br />
          <br />
          Ultimately, we want your Urbit ID to feel like a civilizational key.
          If your Urbit ID were a piece of hardware, you could tap it to unlock
          a door, swipe it to buy a coffee, and plug it into any computer to log
          in. Your Urbit ID should be a unique, beautiful object that’s both an
          address and a wallet. It’s a key to a secret club and the ticket to
          your digital life.
          <br />
          <br />
          If you’re curious to see exactly how this system works, the code is of
          course open source↗. Including the source for our phonemic naming
          system↗ and the visual representations↗. There’s even a Figma plugin↗
          for using them. There’s also an interface for interacting with Urbit
          ID whose source is open↗, too. Since the Urbit ID registry is live and
          deployed you can even look at the chain↗.
        </div>
      </section>

      <section className="overview-section md:mt-[4rem] md:mb-[12rem]">
        <div className="overview-section-title"></div>
        <div className="overview-section-body">
          <Link className="next-button" href="/overview/history">history →</Link>    
        </div>
      </section>
     
    </div>
  );
}
