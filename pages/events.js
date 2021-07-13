import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import SingleColumn from "../components/SingleColumn";
import Section from "../components/Section";
import BackgroundImage from "../components/BackgroundImage";
import { getAllPosts, formatDate } from "../lib/lib";

// function assignEventCard(event) {
//   if (event.extra.youtube) {
//     return (
//       <img
//         src={`http://img.youtube.com/vi/${event.extra.youtube}/maxresdefault.jpg`}
//         className="w-full rounded-lg h-auto w-full"
//       />
//     );
//   }
//
//   if (event.extra.image) {
//     return (
//       <BackgroundImage
//         src={event.extra.image}
//         style={{ height: "620px" }}
//         className="w-full rounded-lg"
//       />
//     );
//   }
//
//   return (
//     <div
//       className="w-full rounded-lg bg-wall"
//       style={{ height: "620px" }}
//     ></div>
//   );
// }
//
// function EventCard(props) {
//   return (
//     <div key={props.event.slug} className="mb-24 cursor-pointer">
//       <Link href={`/events/${props.event.slug}`}>
//         <div>
//           {assignEventCard(props.event)}
//           <h3 className="mt-4">{props.event.title}</h3>
//           <div className="flex items-baseline">
//             {props.event.extra.author ? (
//               <div className="type-ui text-gray mt-4">
//                 {props.event.extra.author}
//               </div>
//             ) : null}
//             {props.event.extra.author && post.extra.ship ? (
//               <div className="mx-1 text-gray">•</div>
//             ) : null}
//             {props.event.extra.ship ? (
//               <div className="type-ui text-gray font-mono">
//                 {props.event.extra.ship}
//               </div>
//             ) : null}
//           </div>
//
//           <div className="type-ui text-gray mt-2">
//             {formatDate(new Date(props.event.date))} - {props.event.extra.time}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

export function EventCard({ event, dir }) {
  return (
    <div
      key={event.slug}
      className="mb-24 cursor-pointer bg-wall rounded-xl tile-height"
      style={{ backgroundImage: event.extra?.image || "" }}
    >
      <Link href={`${dir ? dir : "/events/"}${event.slug}`}>
        <div className="flex flex-col p-8 justify-between items-between h-full relative">
          <div className="flex-grow-1 flex flex-col justify-center h-full">
            <h3 className="mb-4">{event.title}</h3>
            <h4 className="mt-4 type-gray">{event?.type}</h4>
          </div>
          <div className="absolute left-8 bottom-8 w-full">
            <p className="text-gray">{event.extra.host}</p>
            <p className="text-gray">{event.extra.guests}</p>
          </div>
          {event.extra.youtube ? (
            <a
              onClick={(e) => e.stopPropagation()}
              className="absolute w-16 h-16 right-8 bottom-8 bg-white flex items-center justify-center rounded-full bg-cover bg-center bg-no-repeat"
              target="_blank"
              href={`https://www.youtube.com/watch?v=${event.extra.youtube}`}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 7.56699C11.5833 7.75944 11.5833 8.24056 11.25 8.43301L6.75 11.0311C6.41667 11.2235 6 10.983 6 10.5981L6 5.40192C6 5.01702 6.41667 4.77646 6.75 4.96891L11.25 7.56699Z"
                  fill="black"
                />
              </svg>
            </a>
          ) : null}
        </div>
      </Link>
    </div>
  );
}

export default function Events({ pastEvents, currentEvents, search }) {
  return (
    <Container>
      <Head>
        <title>Urbit • Events</title>
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <div className="measure">
            <h1 className="pb-16">Events</h1>
            <p className="pb-6">
              Events of all kinds: In-person, Remote, and Recorded.
            </p>
            <p>
              Subscribe to the Urbit Newsletter for regular updates, including
              new blog posts and events.
            </p>
          </div>
        </Section>
        <Section narrow>
          <div className="mb-8 table">
            <span className="bg-green text-white badge-lg">Coming Soon</span>
          </div>
          {currentEvents.map((post) => {
            return <EventCard event={post} />;
          })}
        </Section>

        <Section narrow>
          <div className="mb-8 table">
            <span className="bg-wall text-gray badge-lg">Past Events</span>
          </div>
          {pastEvents.map((post) => {
            return <EventCard event={post} />;
          })}
        </Section>
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
