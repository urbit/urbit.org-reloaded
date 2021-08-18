import { useRouter } from "next/router";
import {
  getPostBySlug,
  getAllPosts,
  getNextPost,
  getPreviousPost,
  formatDate,
  formatTime,
  generateDisplayDate,
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
  const starts = generateDisplayDate(event.date);
  const ends = generateDisplayDate(event.ends);

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
          <p className="text-wall-400 mt-6">{formatDate(starts)}</p>
          <p className="text-wall-400">
            {formatTime(starts)}
            <ShowOrHide
              condition={typeof event.ends !== "undefined"}
            >{` to ${formatTime(ends)}`}</ShowOrHide>
          </p>
          <h4>{`Host${event.hosts.length > 1 ? "s" : ""}`}</h4>
          <p>
            <ReadableList>
              {event.hosts.map((host) => (
                <Person person={host} />
              ))}
            </ReadableList>
          </p>
          {event.guests ? (
            <>
              <h4>{`With Guest${event.hosts.length > 1 ? "s" : ""}`}</h4>
              <p>
                <ReadableList>
                  {event.guests.map((guest) => (
                    <Person person={guest} />
                  ))}
                </ReadableList>
              </p>
            </>
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
              allowfullscreen
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
        "date",
        "hosts",
        "guests",
        "dark",
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
        "date",
        "hosts",
        "guests",
        "dark",
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
      "date",
      "hosts",
      "slug",
      "guests",
      "content",
      "dark",
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
