import Link from "next/link";

export default function EventPreview({ event, className, title, rsvp }) {
  // Event tiles have a 'dark mode' used when their background images are dark and white text is needed for legibility.
  const grayText = event.extra?.dark ? "text-midWhite" : "text-gray";
  const blackText = event.extra?.dark ? "text-white" : "text-black";

  return (
    <div className={`cursor-pointer ${className}`}>
      {title ? <h3 className="mb-2">{title}</h3> : null}
      <div
        key={event.slug}
        className={`bg-wall rounded-xl h-96 bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${event.extra?.image})` || "" }}
      >
        <Link href={`/events/${event.slug}`}>
          <div className="flex flex-col p-4 justify-between items-between h-full relative">
            <div className="flex-grow-1 flex flex-col justify-center h-full">
              <h4 className={`mb-4 ${blackText}`}>{event.title}</h4>
              <p className={grayText}>{event?.type}</p>
            </div>
            <div className="absolute p-4 left-0 bottom-0 w-full">
              <p className={`${grayText} type-ui-small`}>{event.extra.host}</p>
              <p className={`${grayText} type-ui-small`}>
                {event.extra.guests}
              </p>
            </div>
            {rsvp && event.extra.registration_url && event.extra.pinned ? (
              <div className="absolute right-0 bottom-0 p-4">
                <a
                  className="button-sm bg-green text-white"
                  href={event.extra.registration_url}
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
