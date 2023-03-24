import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import React from "react";
import { DateTime } from "luxon";
import {
  Container,
  Section,
  SingleColumn,
  TwoUp,
  IntraNav,
  getAllPosts,
  generateRealtimeDate,
  getPage,
  Markdown,
  getPreviousPost,
  getNextPost,
} from "@urbit/foundation-design-system";
import { getAllEvents } from "../../lib/lib";
import { join } from 'path';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import PostPreview from "../../components/PostPreview";
import EventPreview from "../../components/EventPreview";
import Sidebar from "../../components/Sidebar";
import { eventKeys } from "../../lib/constants";
import IndexCard from "../../components/ecosystem/IndexCard";
import HighlightCard from "../../components/HighlightCard";
import fs from "fs";
import path from "path";
import Meta from "../../components/Meta";
import campusTree from "../../cache/campus.json";
import { matchEcosystemPost } from "../../lib/lib";

export default function Home({
  posts,
  highlights,
  ecosystem,
  events,
  grantNumbers,
  search,
  data,
  markdown,
}) {
  const post = {
    title: "Urbit",
    description: "A clean-slate OS and network for the 21st century.",
    image: "https://storage.googleapis.com/media.urbit.org/site/opengraph/urbit.png"
  };
  return (
    <Container>
      <Head>
        <title>Urbit</title>
        {Meta(post, false, true)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      
        <SingleColumn>
            <Header search={search} />

            {/* Hero statement */}
            <Section className="pb-6">      
                <div className="flex flex-col space-y-4">
                    <h1 className="max-w-prose">
                    [Hero statement goes here. Hero statement goes here.] 
                    </h1>
                    
                </div>
            </Section>

            

            {/* Brief explanatory paragraph */}
            <Section narrow className="pb-1">
   
                <div className="w-full space-y-8 max-w-prose">

                    <div className="space-y-4">
                    <p className="">
                    <span className="font-bold">The internet cannot be saved. </span> 
                    No matter how many unsuspecting youth are press-ganged into derivative careers maintaining, 
                    optimizing, and reskinning this house of cards, the web as we know it is doomed to crumble under 
                    its own weight. The platforms are closed, the data is siloed, and all the exits are shut tight.
                    </p>
                    <p>
                    Well, <i>almost</i> all the exits. For those with the gall to think outside the box, there is another way. 
                    A complete reimagining of networked computing from the OS up, designed to facilitate the construction 
                    of powerful, enduring, and decentralized systems. On <span className="font-bold">Urbit</span>, every computer is a personal server, enabling 
                    all of the functionality of the legacy internet (and more) without requiring users to cede control of their 
                    digital identity to faceless corporations.
                    </p>
                    <p>
                    The Urbit Foundation’s Campus Outreach Program aims to find ambitious students interested in leaving the old 
                    world behind and providing them with the information and resources to help build a better future. 
                    If you fit that description and want us to come to your university,{" "}
                    <Link href="/campus#contact" passHref>
                    <a>get in touch.</a>
                    </Link>{" "}
                    </p>
                    </div>
                </div>
            </Section>

            {/* 
              how to make an in-page link (href to hashtag element id)
              <a href="#events"> cheebo </a> 
            */}


            <Section className="pb-12">
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                <Link href="/campus/software-developers#reading">
                  <div className="cursor-pointer bg-wall-100 rounded-xl min-h-0 flex-1">    
                    <div className="flex flex-col p-4 h-full relative">
                      <div className="pt-1">
                        <p className="mb-2 font-semibold leading-5">Urbit for Software Developers</p>
                        <p className="text-sm leading-5">Learn how to build on the clean-slate OS and network for the 21st century</p>
                      </div>
                    </div>
                  </div>                   
                </Link>
                <Link href="/campus/blockchain-enthusiasts#reading">
                  <div className="cursor-pointer bg-wall-100 rounded-xl min-h-0 flex-1">    
                    <div className="flex flex-col p-4 h-full relative">
                      <div className="pt-1">
                        <p className="mb-2 font-semibold leading-5">Urbit for Blockchain Enthusiasts</p>
                        <p className="text-sm leading-5">Learn how sound computing and sound digital money fit together</p>
                      </div>
                    </div>
                  </div>                   
                </Link>
                <Link href="/campus/everyone-else#reading">
                  <div className="cursor-pointer bg-wall-100 rounded-xl min-h-0 flex-1">    
                    <div className="flex flex-col p-4 h-full relative">
                      <div className="pt-1">
                        <p className="mb-2 font-semibold leading-5">Urbit for Everyone Else</p>
                        <p className="text-sm leading-5">For those without the technical chops</p>
                      </div>
                    </div>
                  </div>                   
                </Link>
                <Link href="#events">
                  <div className="cursor-pointer bg-wall-100 rounded-xl min-h-0 flex-1">    
                    <div className="flex flex-col p-4 h-full relative">
                      <div className="pt-1">
                        <p className="mb-2 font-semibold leading-5">Events</p>
                        <p className="text-sm leading-5">Find upcoming events and schedule one at your campus</p>
                      </div>
                    </div>
                  </div>                   
                </Link>
              </div>
            </Section>

            
          

            {
              //embedding test w/ overview page:
            }

            <Section>
              <h3 className="mb-8" id="reading">Attended an event and interested in learning more? Start here:</h3> 
              <hr></hr>
              <br></br>
              <div className="flex justify-between sidebar md:space-x-8">
                <Sidebar search={search}>
                {childPages("/campus", posts.pages)}
                </Sidebar>
                <div className="markdown max-w-prose">
                  <h3>{data.title}</h3>
                  <Markdown.render content={JSON.parse(markdown)} />
                </div>
              </div>
            </Section>

            {
                //Events
            }

            <Section className="pb-1">
                <hr></hr>
                <br></br>
                <div className="mt-6">
                    <h2 className="mb-8" id="events">Events</h2>
                    <TwoUp>
                        <EventPreview event={events[0]} className="mb-8" />
                        {events[1] ? <EventPreview event={events[1]} className="mb-8" /> : <div />}
                    </TwoUp>
                    <Link href="/events?tag=campus">
                        <a className="bg-wall-600 text-white button-lg w-fit">
                            View All
                        </a>
                    </Link>
                </div>
            </Section>

            <div id="contact"></div>

            <Section className="pb-12">
              
              <div className="bg-wall-100 w-full p-4 md:p-8 rounded-3xl flex flex-wrap items-center">

                <div className="basis-full sm:basis-1/3 pb-4 sm:pb-0">
                  <img className="rounded-xl w-72" src="https://storage.googleapis.com/media.urbit.org/assembly/assembly-thumb2.jpg" />
                </div>
                <div className="sm:basis-2/3 sm:pl-6 align-middle">
                  <h2 className=" text-2xl pb-2" >Get in touch</h2 >
                  <p className="max-w-prose pb-4">
                    Not sure how to get started after attending an event? Want to schedule one at your university? 
                    Don't be a stranger. Reach out at the email below, or{" "}
                    <Link href="https://urbit.org/groups/~tidren-nosryg/campus-outreach" passHref>
                    <a>find us on Urbit.</a>
                    </Link>{" "}
                  </p>
                  <Link href="mailto:campus@urbit.org">
                    <a className="button-sm border-2 border-wall-600 text-wall-600 type-sm max-w-fit">
                      campus@urbit.org
                    </a>
                  </Link>
                </div>
              </div>
            </Section>

        


        </SingleColumn>
      
      

      <Footer />
    </Container>
  );
}

const childPages = (thisLink, children, level = 0) => {
  const router = useRouter();

  const isThisPage = router.asPath === thisLink;

  const pageItemClasses = classnames({
    "text-base type-ui": level === 0,
    "text-wall-400": !isThisPage,
    "text-black": isThisPage,
  });
  return (
    <ul className="">
      <li className="pb-2">
        <Link href="/campus">
          <a className={`${pageItemClasses} cursor-pointer`}>Get on Urbit</a>
        </Link>
      </li>
      {children?.map((child) => (
        <li className="pb-2">
          {pageTree(join(thisLink, child.slug), child, level)}
        </li>
      ))}
    </ul>
  );
};

const pageTree = (thisLink, tree, level = 0) => {
  const router = useRouter();

  const isThisPage = router.asPath === thisLink;

  const pageItemClasses = classnames({
    "text-base type-ui": level === 0,
    "text-wall-400": !isThisPage,
    "text-black": isThisPage,
  });

  return (
    <>
      <Link href={thisLink}>
        <a className={`${pageItemClasses} cursor-pointer`}>{tree.title}</a>
      </Link>
    </>
  );
};

export async function getStaticPaths() {
  const posts = campusTree;

  const slugs = [];

  const allHrefs = (thisLink, tree) => {
    slugs.push(thisLink, ...tree.pages.map((e) => join(thisLink, e.slug)));
    allHrefsChildren(thisLink, tree.children);
  };

  const allHrefsChildren = (thisLink, children) => {
    Object.entries(children).map(([childSlug, child]) => {
      allHrefs(join(thisLink, childSlug), child);
    });
  };

  allHrefs("/campus", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = campusTree;

  const { data, content } = getPage(
    join(process.cwd(), "content/campus", params.slug?.join("/") || "/")
  );
  const markdown = JSON.stringify(Markdown.parse({ post: { content } }));

  const previousPost =
    getPreviousPost(
      params.slug?.slice(-1).join("") || "campus",
      ["title", "slug", "weight"],
      join("campus", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const nextPost =
    getNextPost(
      params.slug?.slice(-1).join("") || "campus",
      ["title", "slug", "weight"],
      join("campus", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const events = getAllEvents(eventKeys, "events").filter((e) => e?.tags?.includes("campus"));

  return { props: { posts, data, markdown, params, previousPost, nextPost, events } };
}




/* export async function getStaticProps() {
    

    const events = getAllEvents(eventKeys, "events").filter((e) => e?.tags?.includes("campus"));

    // const { data, content } = getPage(join(process.cwd(), 'content', 'bitcoin'));

    return {
        props: {
            events
        }
    }
}
 */