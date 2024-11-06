import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";
// import { PostList } from "../components/PostList";
import { EventsList } from "../components/EventsList";

export default async function EventsHome() {
  const paths = {
    events: { path: "events/", frontMatter: [] },
    communities: { path: "communities/", frontMatter: [] },
  };

  // Load posts tree for each path
  await Promise.all(
    Object.keys(paths).map(async (key) => {
      const tree = await getPostsTree(paths[key].path);

      await Promise.all(
        tree.map(async (post) => {
          const frontMatter = await getToml(post.relativePath);
          paths[key].frontMatter.push({
            data: frontMatter.data,
            relativePath: post.relativePath,
            slug: post.slug,
          });
        })
      );
    })
  );

  const allCommunitiesFrontMatter = paths.communities.frontMatter;
  const upcomingEvents = paths.events.frontMatter.filter((event) => {
    return new Date(event.data.starts) > new Date();
  });
  const pastEvents = paths.events.frontMatter.filter((event) => {
    return new Date(event.data.starts) < new Date();
  });

  const allEventsFrontMatter = paths.events.frontMatter;

  return (
    <div className="container mb-32 md:mt-9">
      <div className="md:grid grid-cols-6 gap-x-4 w-full mb-12">
      <div className="col-start-2 col-span-4 text-25px font-[400]">
      <p>Explore Urbit and our community, in-person and online.</p>
      </div>
      </div>
      <br />
      <Section title="Upcoming">
        {upcomingEvents.map((event, i) => {
          return <Event key={event} event={event.data} />;
        })}
      </Section>
      <Section title="Meetups">
        <p>
          Urbit has meetups worldwide. Join your local communities or start your
          own.
        </p>
        <br />
        {allCommunitiesFrontMatter.map((event, i) => {
          return (
            <div key={i}>
              <h1>{event.data.title}</h1>
            </div>
          );
        })}
      </Section>
      <Section title="Calendar"></Section>
      <iframe
        className="mb-12"
        src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York"
        width="100%"
        height="800"
      ></iframe>
      <EventsList events={JSON.parse(JSON.stringify(pastEvents))} />

    </div>
  );
}

export const Section = ({ title, children }) => {
  return (
    <section className="grid grid-cols-6 w-full h-full mb-12 pt-4 gap-x-4 [&:not(:first-of-type)]:border-t-[1.2px] border-gray-87">
      <div className="col-span-1">
        <h1 className="8">{title}</h1>
      </div>
      <div className="col-span-5">{children}</div>
    </section>
  );
};
export const Event = ({ event }) => {
  return (
    <div className="eventblock mb-12">
      <h1 className="font-bold">{event.title}</h1>
      <div className="mb-4">
        {event.starts} — {event.ends}{" "}
      </div>
      <div className="mb-4">{event?.description}</div>
      <div>{event.location}</div>
    </div>
  );
};
