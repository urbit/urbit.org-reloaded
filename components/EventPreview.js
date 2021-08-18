import Link from "next/link";
import { DateTime } from "luxon";
import { ShowOrHide, ReadableList, Person } from "../components/Snippets";
import {
  generateDisplayDate,
  generateRealtimeDate,
  formatDate,
  formatTime,
} from "../lib/lib";

export default function EventPreview({ event, className, big }) {
  // Event tiles have a 'dark mode' used when their background images are dark and white text is needed for legibility.
  const grayText = event?.dark ? "text-midWhite" : "text-wall-400";
  const blackText = event?.dark ? "text-white" : "text-wall-600";

  const starts = generateDisplayDate(event.date);
  const ends = generateDisplayDate(event.ends);

  const hasEnded = generateRealtimeDate(event.ends) > DateTime.now();
  const happeningNow =
    generateRealtimeDate(event.date) > DateTime.now() && !hasEnded;

  return (
    <div className={`cursor-pointer aspect-w-5 aspect-h-4 ${className}`}>
      <div
        key={event.slug}
        className={`bg-wall-100 rounded-xl bg-cover bg-center bg-no-repeat `}
        style={{ backgroundImage: `url(${event.image})` || "" }}
      >
        <Link href={`/events/${event.slug}`}>
          <div
            className={`flex flex-col p-6 justify-between items-between h-full relative`}
          >
            <div
              className={`flex-grow-1 flex ${
                big ? "justify-center" : ""
              } flex-col h-full`}
            >
              <h4 className={`${blackText}`}>{event.title}</h4>
              <p className={grayText}>{formatDate(starts)}</p>
              <p className={grayText}>
                {formatTime(starts)}
                {typeof event.ends !== "undefined"
                  ? ` to ${formatTime(ends)}`
                  : null}
              </p>
            </div>

            <div className="absolute p-4 left-0 bottom-0 w-full">
              <ShowOrHide condition={event.hosts}>
                <p className={`type-sub-bold ${blackText}`}>
                  {event.hosts
                    ? event.hosts.length > 1
                      ? "Hosts"
                      : "Host"
                    : null}
                </p>
              </ShowOrHide>
              <ShowOrHide condition={event.hosts}>
                <ReadableList>
                  {event.hosts?.map((host, index) => (
                    <Person person={host} />
                  ))}
                </ReadableList>
              </ShowOrHide>
              <ShowOrHide condition={event.guests}>
                <p className={`type-sub-bold pt-2 ${blackText}`}>
                  {event.guests
                    ? event.guests.length > 1
                      ? "With guests"
                      : "With guest"
                    : null}
                </p>
              </ShowOrHide>
              <ShowOrHide condition={event.guests}>
                <ReadableList>
                  {event.guests?.map((guest, index) => (
                    <Person person={guest} />
                  ))}
                </ReadableList>
              </ShowOrHide>
            </div>

            {hasEnded && event.registration_url ? (
              <div className="absolute right-0 bottom-0 p-4">
                <a
                  className="button-sm bg-green-400 text-white"
                  href={event.registration_url}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                >
                  RSVP
                </a>
              </div>
            ) : event.youtube ? (
              <div className="absolute right-0 bottom-0 p-4">
                <a
                  className="button-sm bg-wall-600 text-white"
                  href={`https://www.youtube.com/watch?v=${event.youtube}`}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                >
                  ▶ Watch
                </a>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
}
