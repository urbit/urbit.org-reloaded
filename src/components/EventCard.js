import React from "react";
import Link from "next/link";
import classnames from "classnames";
import path from "path";
import { generateDisplayDate } from "@urbit/fdn-design-system";
import DateRange from "@/components/DateRange";

export default function EventCard({
  className = "",
  title,
  description,
  location,
  starts,
  ends,
  timezone,
  image,
  slug,
}) {
  return (
    <>
      <Link
        className={classnames(
          "hidden md:flex flex-col justify-between aspect-[3/2]",
          "bg-cover bg-center rounded-lg text-[#F5FFF5] bg-container-variant",
          className
        )}
        style={image ? { backgroundImage: `url(${image})` } : {}}
        href={path.join("/events", slug)}
      >
        <div className="px-4 pt-4 pb-8 rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent">
          <h3 className="h2 mb-3.5">{title}</h3>
          <p className="body-sm">{description}</p>
        </div>
        <div className="px-4 pb-4 pt-8 rounded-b-lg bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
          <hr className="hr-horizontal border-[#F5FFF5] mb-3.5" />
          <div className="flex justify-between body-sm h-[2.68em]">
            <p className="break-words line-clamp-2 text-ellipsis mr-3.5">
              {location}
            </p>
            <DateRange
              starts={generateDisplayDate(starts)}
              ends={generateDisplayDate(ends)}
            />
          </div>
        </div>
      </Link>
      <Link
        className={classnames(
          "flex md:hidden flex-col justify-between aspect-square",
          "bg-cover bg-center rounded-lg text-[#F5FFF5] bg-gray",
          className
        )}
        style={image ? { backgroundImage: `url(${image})` } : {}}
        href={path.join("/events", slug)}
      >
        <div className="px-4 pt-4 rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent">
          <h3 className="h3 mb-3.5">{title}</h3>
          <p className="body-sm">{description}</p>
        </div>
        <div className="px-4 pb-4 rounded-b-lg bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
          <hr className="hr-horizontal border-[#F5FFF5] mb-3.5" />
          <div className="body-sm h-[2.68em]">
            <DateRange
              starts={generateDisplayDate(starts)}
              ends={generateDisplayDate(ends)}
            />
          </div>
        </div>
      </Link>
    </>
  );
}
