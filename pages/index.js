import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Container from "../components/Container";
import SingleColumn from "../components/SingleColumn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";
import TabCarousel from "../components/TabCarousel";
import NewsletterSignup from "../components/NewletterSignup";
import PostPreview from "../components/PostPreview";
import { getAllPosts, formatDate, getOpenGrantsCount } from "../lib/lib";
import { contact } from "../lib/constants";

export default function Home({ posts, events, openGrantsCount }) {
  const [tab, setTab] = useState(0);

  return (
    <Container>
      <SingleColumn>
        <Header />

        {
          // Hero Statement
        }
        <section className="layout-narrow">
          <h1>A general-purpose,</h1>
          <h1>peer-to-peer,</h1>
          <h1>personal computing system.</h1>
        </section>

        {
          // Introducing Port
        }
        <section className="layout-wide hidden md:flex">
          <div className="bg-wall w-11/12 hero-card-height rounded-3xl flex">
            <div className="pt-20 pl-12 w-7/12">
              <div className="pb-8">
                <h2 className="p-0 m-0 pb-2">Introducing</h2>
                <h2 className="text-green p-0 m-0">Port</h2>
              </div>
              <h3 className="pb-8">The Urbit client, now in beta.</h3>
              <p className="pb-24">
                Getting into Urbit is now as simple as installing an app on your
                computer.
              </p>
              <button className="button-lg type-ui mb-5 bg-green text-white">
                Download For Mac
              </button>
              <a className="type-ui text-gray">View on GitHub</a>
            </div>
            <div className="bg-black w-full rounded-xl hero-image-height hero-image mt-8" />
          </div>
        </section>

        {
          // Grants
        }
        <section className="layout-narrow">
          <div className="flex flex-col md:flex-row md:items-center measure pb-12">
            <h2 className="m-0 p-0 mr-4 md:mb-0 mb-4">Urbit Grants</h2>
            <div>
              <button className="bg-green text-white badge-lg">
                {openGrantsCount} Open
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center bg-washedGreen px-8 py-8 rounded-xl">
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green">200+</h2>
              <h3 className="text-green text-center pt-2">
                Urbit stars awarded
              </h3>
            </div>
            <div className="h-0 w-0 md:h-24 md:w-4 bg-lightGreen" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green">1M+</h2>
              <h3 className="text-green text-center pt-2">USD Rewarded</h3>
            </div>
            <div className="h-0 w-0 md:h-24 md:w-4 bg-lightGreen" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green">90+</h2>
              <h3 className="text-green text-center pt-2">Grants completed</h3>
            </div>
          </div>
          <div className="measure py-12">
            <p className="pb-12">
              We regularly give away address space to reward community
              contributions, including education, promotion, and development.
            </p>
            <button className="button-lg bg-green text-white">
              View Grants
            </button>
          </div>
        </section>

        {
          // Build on Urbit Developer CTA
        }
        <section className="layout-narrow">
          <div className="measure">
            <h2 className="pb-12">Build on Urbit</h2>
            <h3 className="pb-12">
              Urbit is a personal OS designed from scratch to run peer-to-peer
              applications.
            </h3>
            <p className="pb-12">
              It solves the hard problems of implementing a peer-to-peer network
              (including identity, NAT traversal, and exactly-once delivery) in
              the kernel so app developers can focus on business logic.
            </p>
            <p className="pb-12">
              The entire OS is a{" "}
              <Link href="">
                <a>single pure function</a>
              </Link>{" "}
              that provides application developers with strong guarantees:
              automated persistence and memory management, repeatable builds,
              and support for hot code reloading.
            </p>
            <p className="pb-12">
              You can get started learning how to{" "}
              <Link href="">
                <a>contribute to the project</a>
              </Link>
              , or view a variety of{" "}
              <Link href="">
                <a>libraries</a>
              </Link>{" "}
              for building on Urbit using the languages you already know.
            </p>
            <button className="button-lg type-ui text-white bg-black">
              Read the Developer Docs
            </button>
          </div>
        </section>

        {
          // Blog and Events Combo Section
        }
        <section className="layout-narrow">
          <div className="flex items-center measure pb-12">
            <button
              onClick={() => setTab(0)}
              className={`tab-button-lg mr-6 ${
                tab === 0 ? "text-black" : "text-gray"
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setTab(1)}
              className={`tab-button-lg ${
                tab === 1 ? "text-black" : "text-gray"
              }`}
            >
              Events
            </button>
          </div>

          <TabCarousel index={tab}>
            <div className="flex flex-wrap">
              <PostPreview
                post={posts[0]}
                className={`w-full md:w-1/2 pr-0 pb-8 md:pr-4`}
                key={posts[0].slug}
              />
              <PostPreview
                post={posts[1]}
                className={`w-full md:w-1/2 pl-0 pb-8 md:pl-4`}
                key={posts[1].slug}
              />
              <PostPreview
                post={posts[3]}
                className={`w-full md:w-1/2 pr-0 pb-8 md:pr-4`}
                key={posts[3].slug}
              />
              <PostPreview
                post={posts[4]}
                className={`w-full md:w-1/2 pl-0 pb-8 md:pl-4`}
                key={posts[4].slug}
              />
              <div>
                <Link href="/blog">
                  <button className="button-lg type-ui text-white bg-black">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap">
              <PostPreview
                post={events[0]}
                className={`w-full md:w-1/2 pr-0 pb-8 md:pr-4`}
                key={events[0].slug}
              />
              <PostPreview
                post={events[1]}
                className={`w-full md:w-1/2 pl-0 pb-8 md:pl-4`}
                key={events[1].slug}
              />
              <PostPreview
                post={events[3]}
                className={`w-full md:w-1/2 pr-0 pb-8 md:pr-4`}
                key={events[3].slug}
              />
              <PostPreview
                post={events[4]}
                className={`w-full md:w-1/2 pl-0 pb-8 md:pl-4`}
                key={events[4].slug}
              />
              <div>
                <Link href="/events">
                  <button className="button-lg type-ui text-white bg-black">
                    More Events
                  </button>
                </Link>
              </div>
            </div>
          </TabCarousel>
        </section>

        {
          // Newsletter and social media
        }
        <section className="layout-narrow">
          <div className="measure">
            <h2 className="m-0 p-0 mr-4 pb-12">Stay In Touch</h2>
            <p className="pb-6">
              We send monthly emails on system improvements, upcoming events,
              and community spotlights.
            </p>
          </div>
          <NewsletterSignup />
          <h4 className="mt-12">
            Follow us on{" "}
            <a className="text-green" href={contact.twitter}>
              Twitter
            </a>
          </h4>
          <h4 className="mt-6">
            Explore code on{" "}
            <a className="text-green" href={contact.github}>
              Github
            </a>
          </h4>
          <h4 className="mt-6">
            Ask questions in our{" "}
            <a className="text-green" href={contact.discord}>
              Discord
            </a>
          </h4>
          <div className="mt-4 flex flex-wrap items-baseline">
            <h4 className="mr-2">Boot Urbit and join</h4>
            <code className="bg-wall p-2 rounded-lg">
              {contact.urbitCommunity}
            </code>
          </div>
        </section>
      </SingleColumn>

      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const openGrantsCount = getOpenGrantsCount();

  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra"],
    "blog"
  );

  const events = getAllPosts(["title", "slug", "date", "extra"], "events");

  return {
    props: { posts, events, openGrantsCount },
  };
}
