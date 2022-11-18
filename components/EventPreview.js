import Link from "next/link";
import { DateTime } from "luxon";
import { DateRange } from "../components/Snippets";
import {
  generateDisplayDate,
  generateRealtimeDate,
} from "@urbit/foundation-design-system";
import classNames from "classnames";

export default function EventPreview({ event, className, big }) {
  // Event tiles have a 'dark mode' used when their background images are dark and white text is needed for legibility.
  const grayText = event?.dark ? "text-white dark:text-black" : "text-wall-400";
  const blackText = event?.dark
    ? "text-white dark:text-black"
    : "text-wall-600";

  const starts = generateDisplayDate(event.starts, event.timezone);
  const ends = generateDisplayDate(event.ends, event.timezone);

  const inFuture = generateRealtimeDate(starts) > DateTime.now();

  const happeningNow =
    generateRealtimeDate(event.starts) > DateTime.now() && !inFuture;

  return (
    <div className={`cursor-pointer h-full ${className}`}>
      <div
        key={event.slug}
        className={`bg-wall-100 min-h-[320px] h-full flex flex-col rounded-xl bg-cover bg-center bg-no-repeat `}
        style={{ backgroundImage: `url(${event.image})` || "" }}
      >
        <Link href={`/events/${event.slug}`}>
          <div
            className={classNames(
              "flex flex-col p-6 min-h-[320px] justify-between items-between h-full relative",
              {
                "backdrop-brightness-50 rounded-xl": Boolean(
                  event?.darken_image
                ),
              }
            )}
          >
            <div
              className={`grow-1 flex ${big ? "justify-center" : ""
                } flex-col h-full`}
            >
              <h3 className={`${blackText} mb-2`} id={event.title}>{event.title}</h3>
              <p className={blackText + " truncate text-sm"}>
                {event.description}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div className="">
                <p className={`${blackText} type-sub mb-1`}>{event.location}</p>
                <DateRange
                  starts={starts}
                  ends={ends}
                  className={`${grayText} type-sub`}
                />
              </div>

              {inFuture && event.registration_url ? (
                <div>
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
                <div className="shrink-0">
                  <a
                    className="button-sm bg-wall-600 text-white shrink-0"
                    href={`https://www.youtube.com/watch?v=${event.youtube}`}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                  >
                    ▶ Watch
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
