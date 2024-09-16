import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Main,
  Section,
  FatBlock,
  getAllPosts,
} from "@urbit/fdn-design-system";

import Carousel from "@/components/Carousel";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";
import NewsletterSignup from "@/components/NewsletterSignup";
import Org from "@/components/ecosystem/Org";

const partners = [
  {
    link: "https://near.org/",
    img: "https://storage.googleapis.com/media.urbit.org/assembly/near-logo.png",
  },
  {
    link: "https://www.serotonin.co/",
    img: "https://storage.googleapis.com/media.urbit.org/site/landing/serotonin.svg",
  },
  {
    link: "https://othermeans.us/",
    img: "https://storage.googleapis.com/media.urbit.org/site/landing/om_logo_2024-1.svg",
  },
  {
    link: "https://www.gigaver.se/",
    img: "https://storage.googleapis.com/media.urbit.org/site/landing/giga-black.svg",
  },
];

function CTAs({ className, links }) {
  return (
    <div className={"flex flex-wrap flex-row gap-2 " + className}>
      {links.map((link) => (
        <Link
          className="btn bg-primary hover:bg-secondary text-surface"
          href={link.url}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function Home({ events }) {
  const post = {
    title: "Urbit",
    description: "Leave the internet behind.",
  };

  return (
    <Container>
      <Head>
        <title>urbit.org</title>
        {Meta(post, false, true)}
      </Head>
      {/* <IntraNav /> */}
      <Main className="text-primary body-lg" singleColumn>
        yo world
      </Main>
    </Container>
  );
}

export async function getStaticProps() {
  let events = getAllPosts(
    [
      "title",
      "description",
      "location",
      "starts",
      "ends",
      "timezone",
      "guests",
      "hosts",
      "image",
      "darken_image",
      "dark",
      "registration_url",
      "pinned",
      "slug",
    ],
    "events",
    "starts",
  );

  events.reverse();

  return {
    props: { events },
  };
}
