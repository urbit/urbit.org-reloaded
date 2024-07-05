import React from "react";
import Head from "next/head";
import Link from "next/link";
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
import EventCard from "@/components/EventCard";

export default function AllEvents({
  pastEvents,
  upcomingEvents,
  ongoingEvents,
}) {
  return (
    <Container>
      <Head>
        <title>All • Events • urbit.org</title>
        {Meta({
          title: "All Events",
          description: "In-person, remote, and recorded events about Urbit.",
        })}
      </Head>
      <IntraNav />
      <Main className="text-primary" singleColumn>
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">
            All Events
          </h1>
          <p className="h1">
            In-person, remote, and recorded events about Urbit.{" "}
          </p>
        </section>
        {ongoingEvents.length > 0 && (
          <Section divider={"border-primary"}>
            <h2 className="h2">Ongoing</h2>
            <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {ongoingEvents.map((props) => (
                <EventCard className="h-full w-full" {...props} />
              ))}
            </FatBlock>
          </Section>
        )}
        {upcomingEvents.length > 0 && (
          <Section divider={"border-primary"}>
            <h2 className="h2">Upcoming</h2>
            <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
              {upcomingEvents.map((props) => (
                <EventCard className="h-full w-full" {...props} />
              ))}
            </FatBlock>
          </Section>
        )}
        <Section divider={"border-primary"}>
          <h2 className="h2">Past events</h2>
          <FatBlock className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-6 xl:gap-8">
            {pastEvents &&
              pastEvents.map((props) => (
                <EventCard className="h-full w-full" {...props} />
              ))}
          </FatBlock>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
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
      "darken_image",
      "dark",
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
    props: { pastEvents, upcomingEvents, ongoingEvents },
  };
}
