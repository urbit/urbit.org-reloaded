import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";
import { DateRange } from "../components/DateRange";
import { EventsList } from "../components/EventsList";
import classNames from "classnames";

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
      <div className="md:grid grid-cols-6 gap-x-4 w-full mb-8">
        <div className="col-start-2 col-span-4 text-25px font-[400]">
          <p>Explore Urbit and our community, in-person and online.</p>
        </div>
      </div>
      <Section title="Upcoming">
        {upcomingEvents.map((event, i) => {
          return <Event key={event} event={event.data} />;
        })}
      </Section>
      <Section title="Meetups">
        <div className="text-25px leading-[120%] font-[600]">
          <p>
            Urbit has meetups worldwide. Join your local communities
            or start your own.
          </p>
          <br />
          {allCommunitiesFrontMatter.map((event, i) => {
            return (
              <div key={i}>
                <p>{event.data.title}</p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Calendar" className="!col-span-4">
        <div className="text-25px leading-[120%]">
          Schedule for official Urbit events. In addition to in-person, we regularly hold online events where you can hang out, learn, and get involved. Most of these are in the Urbit Hacker House, a shared virtual office space.
          <div className="flex flex-row gap-x-2 mt-8">
            <div className="bg-gray-87 text-black font-[600] p-1 rounded-lg">Subscribe To Calendar</div>
          <div className="bg-gray-87 text-black font-[600] p-1 rounded-lg">Enter Hacker House</div>
            </div>
        </div>
      </Section>
      
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

export const Section = ({ title, className, children }) => {
  return (
    <section className="grid grid-cols-6 w-full h-full pt-8 mb-[4.375rem] gap-x-4 [&:not(:first-of-type)]:border-t-[1.2px] border-gray-87">
      <div className="col-span-1">
        <h1 className="8">{title}</h1>
      </div>
      <div className={classNames("col-span-5", className)}>{children}</div>
    </section>
  );
};
export const Event = ({ event }) => {
  return (
    <div className="eventblock leading-[130%] text-25px">
      <h1 className="font-[600]">{event.title}</h1>
      <div className="mb-[1em]">
        <DateRange starts={event.starts} ends={event.ends} />
      </div>
      <div className="mb-[1em]">{event?.description}</div>
      <div>{event.location}</div>
    </div>
  );
};
