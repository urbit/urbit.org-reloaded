import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import BackgroundImage from "../components/BackgroundImage";
import { getAllPosts, formatDate } from "../lib/lib";

function assignEventCard(event) {
  if (event.extra.youtube) {
    return (
      <img
        src={`http://img.youtube.com/vi/${event.extra.youtube}/maxresdefault.jpg`}
        className="w-full rounded-lg h-auto w-full"
      />
    );
  }

  if (event.extra.image) {
    return (
      <BackgroundImage
        src={event.extra.image}
        style={{ height: "720px" }}
        className="w-full rounded-lg"
      />
    );
  }

  return (
    <div
      className="w-full rounded-lg bg-wall"
      style={{ height: "720px" }}
    ></div>
  );
}

function EventCard(props) {
  return (
    <div key={props.event.slug} className="mb-24 cursor-pointer">
      <Link href={`/events/${props.event.slug}`}>
        <div>
          {assignEventCard(props.event)}
          <h2 className="mt-4">{props.event.title}</h2>
          <div className="flex items-baseline">
            {props.event.extra.author ? (
              <div className="type-ui text-gray mt-4">
                {props.event.extra.author}
              </div>
            ) : null}
            {props.event.extra.author && post.extra.ship ? (
              <div className="mx-1 text-gray">•</div>
            ) : null}
            {props.event.extra.ship ? (
              <div className="type-ui text-gray font-mono">
                {props.event.extra.ship}
              </div>
            ) : null}
          </div>

          <div className="type-ui text-gray mt-2">
            {formatDate(new Date(props.event.date))} - {props.event.extra.time}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Events({ pastEvents, currentEvents }) {
  return (
    <Container>
      <SingleColumn>
        <Header />
        <section className="layout-wide">
          <div className="measure">
            <h2 className="pb-16">Urbit Events</h2>
            <p className="pb-6">
              Events of all kinds: In-person, Remote, and Recorded.
            </p>
            <p>
              Subscribe to the Urbit Newsletter for regular updates, including
              new blog posts and events.
            </p>
          </div>
        </section>
        <section className="layout-wide">
          <div className="mb-8 table">
            <span className="bg-green text-white badge-lg">Coming Soon</span>
          </div>
          {currentEvents.map((post) => {
            return <EventCard event={post} />;
          })}
        </section>

        <section className="layout-wide">
          <div className="mb-8 table">
            <span className="bg-wall text-gray badge-lg">Past Events</span>
          </div>
          {pastEvents.map((post) => {
            return <EventCard event={post} />;
          })}
        </section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(["title", "slug", "date", "extra"], "events");

  // NB Gavin: This logic can change based on how we want to separate past vs current events
  const pastEvents = posts.filter((post) => !post.extra.pinned);
  const currentEvents = posts.filter((post) => post.extra.pinned);

  return {
    props: { pastEvents, currentEvents },
  };
}
