import React from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import path from "path";
import { DateTime } from "luxon";
import {
  Container,
  Main,
  Section,
  FatBlock,
  getAllPosts,
  generateRealtimeDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Carousel from "@/components/Carousel";
import EventCard from "@/components/EventCard";

function CommunityCard({ className = "", title, image, slug }) {
  return (
    <Link
      className={classnames("relative aspect-square rounded-lg", className)}
      href={path.join("/events", "communities", slug)}
    >
      <h3 className="h3 absolute text-[#F8FAF8] p-2 sm:p-4 w-full rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent">
        {title}
      </h3>
      <img
        className="h-full w-full rounded-lg object-cover"
        src={image}
        /* onError={(e) => (e.target.style.display = "none")} */
      />
    </Link>
  );
}

export default function Events({
  communities,
  events,
  upcomingEvents,
  ongoingEvents,
  pastEvents,
}) {
  const post = {
    title: "Events",
    description: "In-person, remote, and recorded events about Urbit.",
  };

  return (
    <Container>
      <Head>
        <title>{`${post.title} • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main className="text-primary overflow-x-hidden" singleColumn>
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">Events</h1>
          <p className="h1">
            Urbit organizes events <strong>worldwide</strong>. Join your local communities or <Link
                className="hover:text-secondary"
                href="grants/community-meetups"
              >
                <strong>start</strong>
              </Link>
             {" "}
              your own.
              </p>
        </section>
        <Section divider={"border-primary"}>
          <h2 className="h2">Communities</h2>
          <Carousel>
            {communities.map((props) => (
              <CommunityCard className="w-44 sm:w-56 md:w-80" {...props} />
            ))}
          </Carousel>
        </Section>
        {ongoingEvents.length > 0 && (
          <Section divider={"border-primary"}>
            <h2 className="h2">Ongoing</h2>
            <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {ongoingEvents.slice(0, 2).map((props) => (
                <EventCard {...props} />
              ))}
            </FatBlock>
          </Section>
        )}
        {upcomingEvents.length > 0 && (
          <Section divider={"border-primary"}>
            <h2 className="h2">Upcoming</h2>
            <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {upcomingEvents.slice(0, 2).map((props) => (
                <EventCard {...props} />
              ))}
            </FatBlock>
          </Section>
        )}
        <Section divider={"border-primary"}>
          <h2 className="h2">Past events</h2>
          <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
            {pastEvents &&
              pastEvents.slice(0, 4).map((props) => <EventCard {...props} />)}
          </FatBlock>
          <Link
            className="btn bg-primary hover:bg-secondary text-surface body-lg w-min"
            href="/events/all"
          >
            More events
          </Link>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const communities = getAllPosts(
    ["title", "description", "image", "content", "slug"],
    "communities",
    "title"
  );

  const events = getAllPosts(
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
      "registration_url",
      "pinned",
      "content",
      "slug",
    ],
    "events",
    "starts"
  );

  let upcomingEvents = [];
  let ongoingEvents = [];
  let pastEvents = [];
  const now = DateTime.now();

  events.forEach((e) => {
    const starts = generateRealtimeDate(e.starts);
    const ends = generateRealtimeDate(e.ends);
    if (starts <= now && now <= ends) {
      ongoingEvents.push(e);
    } else if (now < starts) {
      upcomingEvents.push(e);
    } else if (starts < now) {
      pastEvents.push(e);
    }
  });

  pastEvents.reverse();

  return {
    props: { communities, events, pastEvents, upcomingEvents, ongoingEvents },
  };
}
