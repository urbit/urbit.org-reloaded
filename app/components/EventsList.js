"use client";
import { useState, useEffect } from "react";
import classNames from "classnames";

export const EventsList = ({ events }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Section title="Past Events">
      <div className="col-span-1">
        <h1 className="">Past Events</h1>
      </div>
      <div className="col-span-5">
        <div className="grid grid-cols-2 gap-x-12">
          {events.slice(0, showAll ? 1000 : 4).map((event, i) => {
            return (
              <div key={event + i}>
                <Event event={event.data} />
              </div>
            );
          })}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault(); 
            setShowAll(true);
          }}
        >
          show more
        </button>
      </div>
    </Section>
  );
};
export const Section = ({ title, children }) => {
  return (
    <section className="grid grid-cols-6 w-full h-full mb-12 pt-4 gap-x-4 border-t-[1.2px] border-gray-87">
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
