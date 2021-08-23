import { useRouter } from "next/router";
import { DateTime } from "luxon";
import {
  getPostBySlug,
  getAllPosts,
  getNextPost,
  getPreviousPost,
  formatDate,
  formatTime,
  formatTimeZone,
  generateDisplayDate,
  generateRealtimeDate,
} from "../../lib/lib";
import Head from "next/head";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import Markdown from "../../components/Markdown";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SingleColumn from "../../components/SingleColumn";
import Contact from "../../components/Contact";
import EventPreview from "../../components/EventPreview";
import Section from "../../components/Section";
import { Person, ReadableList, ShowOrHide } from "../../components/Snippets";
import { decode } from "html-entities";

export default function Event({
  event,
  nextEvent,
  previousEvent,
  markdown,
  search,
}) {
  const starts = generateDisplayDate(event.starts, event.timezone);
  const ends = generateDisplayDate(event.ends, event.timezone);

  const inFuture = generateRealtimeDate(starts) > DateTime.now();

  const happeningNow =
    generateRealtimeDate(event.starts) > DateTime.now() && !inFuture;

  return (
    <Container>
      <Head>
        <title>{event.title} • Events • urbit.org</title>
        {Meta(event)}
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow short>
          <h1>{event.title}</h1>
          <h3 className="mt-6">{event.description}</h3>
          <p className="text-wall-600 mt-6">{formatDate(starts)}</p>
          <p className="text-wall-600">
            {formatTime(starts)}
            <ShowOrHide condition={typeof event.ends !== "undefined"}>
              {` to ${formatTime(ends)}`}
              {" " + formatTimeZone(ends)}
            </ShowOrHide>
          </p>
          <div className="mt-6">
            <ShowOrHide condition={event.hosts}>
              <p>
                {"Hosted by "}
                <ReadableList>
                  {event.hosts?.map((host, index) => {
                    return (
                      <Person
                        key={`${host.name}-${host.patp}`}
                        name={host.name}
                        patp={host.patp}
                      />
                    );
                  })}
                </ReadableList>
              </p>
            </ShowOrHide>
            <ShowOrHide condition={event.guests}>
              <p>
                {event.guests?.length > 1 ? "With guest " : "With guest "}
                <ReadableList>
                  {event.guests?.map((guest, index) => (
                    <Person
                      key={`${guest.name}-${guest.patp}`}
                      name={guest.name}
                      patp={guest.patp}
                    />
                  ))}
                </ReadableList>
              </p>
            </ShowOrHide>
          </div>
          {inFuture && event.registration_url ? (
            <div className="table mt-6">
              <a
                className="button-sm bg-green-400 text-white"
                href={event.registration_url}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
              >
                RSVP
              </a>
            </div>
          ) : null}
        </Section>
        <Section short wide>
          {event.youtube ? (
            <iframe
              className="rounded-xl"
              width="100%"
              height="640px"
              src={`https://www.youtube.com/embed/${event.youtube}`}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
            ></iframe>
          ) : null}
        </Section>
        <Section short narrow className="markdown">
          <article
            className="pt-12 w-full"
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
        </Section>
        <Section narrow>
          <Contact />
        </Section>
        <Section wide className="flex">
          {previousEvent === null ? (
            <div className={"w-1/2 mr-4"} />
          ) : (
            <div className="mr-4 w-1/2">
              <EventPreview title="Previous Event" event={previousEvent} />
            </div>
          )}
          {nextEvent === null ? (
            <div className={"w-1/2 ml-4"} />
          ) : (
            <div className="mr-4 w-1/2">
              <EventPreview title="Next Event" event={nextEvent} />
            </div>
          )}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const nextEvent =
    getNextPost(
      params.slug,
      [
        "title",
        "slug",
        "ends",
        "location",
        "image",
        "registration_url",
        "youtube",
        "description",
        "starts",
        "hosts",
        "guests",
        "dark",
        "timezone",
      ],
      "events"
    ) || null;

  const previousEvent =
    getPreviousPost(
      params.slug,
      [
        "title",
        "slug",
        "ends",
        "location",
        "image",
        "registration_url",
        "youtube",
        "description",
        "starts",
        "hosts",
        "guests",
        "dark",
        "timezone",
      ],
      "events"
    ) || null;

  const event = getPostBySlug(
    params.slug,
    [
      "title",
      "ends",
      "location",
      "image",
      "registration_url",
      "youtube",
      "description",
      "starts",
      "hosts",
      "slug",
      "guests",
      "content",
      "dark",
      "timezone",
    ],
    "events"
  );

  const markdown = await Markdown({ post: event });

  return {
    props: { event, markdown, nextEvent, previousEvent },
  };
}

export async function getStaticPaths() {
  const events = getAllPosts(["slug", "date"], "events");

  return {
    paths: events.map((event) => {
      return {
        params: {
          slug: event.slug,
        },
      };
    }),
    fallback: false,
  };
}
