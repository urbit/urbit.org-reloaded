import Link from "next/link";
import { formatDateWithTime } from "../lib/lib";

export default function EventPreview({ event, className, rsvp }) {
  // Event tiles have a 'dark mode' used when their background images are dark and white text is needed for legibility.
  const grayText = event.extra?.dark ? "text-midWhite" : "text-wall-500";
  const blackText = event.extra?.dark ? "text-white" : "text-wall-600";

  return (
    <div className={`cursor-pointer ${className}`}>
      <div
        key={event.slug}
        className={`bg-wall rounded-xl h-96 bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${event?.image})` || "" }}
      >
        <Link href={`/events/${event.slug}`}>
          <div className="flex flex-col p-4 justify-between items-between h-full relative">
            <div className="flex-grow-1 flex flex-col justify-center h-full">
              <h4 className={`${blackText}`}>{event.title}</h4>
              <p className={grayText}>{formatDateWithTime(event.date)}</p>
            </div>
            <div className="absolute p-4 left-0 bottom-0 w-full">
              {event.hosts
                ? event.hosts.map((host, index) => (
                    <div className="flex">
                      {host.name ? (
                        <p className={`type-sub-bold mr-2`}>{host.name}</p>
                      ) : null}
                      {host.patp ? (
                        <p
                          className={`${
                            host.name ? grayText : ""
                          } type-sub-bold font-mono`}
                        >
                          {host.patp}
                        </p>
                      ) : null}
                      {event.hosts.length > 1 &&
                      index !== event.hosts.length - 1 ? (
                        <p className="type-sub-bold">{`,`}</p>
                      ) : null}
                    </div>
                  ))
                : null}
              {event.guests
                ? event.guests.map((guest) => (
                    <div className="flex">
                      {guest.name ? (
                        <p className={`type-sub-bold mr-2`}>{guest.name}</p>
                      ) : null}
                      {guest.patp ? (
                        <p
                          className={`${
                            guest.name ? grayText : ""
                          } type-sub-bold font-mono`}
                        >
                          {guest.patp}
                        </p>
                      ) : null}
                    </div>
                  ))
                : null}
            </div>
            {rsvp && event.registration_url ? (
              <div className="absolute right-0 bottom-0 p-4">
                <a
                  className="button-sm bg-green text-white"
                  href={event.registration_url}
                >
                  RSVP
                </a>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
}
