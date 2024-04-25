import React from "react";
import Link from "next/link";
import classnames from "classnames";
import path from "path";
import { NoSsr, generateDisplayDate } from "@urbit/fdn-design-system";
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
  darken_image = false,
  dark = false,
  slug,
}) {
  const textColor = { "text-[#F5FFF5]": dark, "text-[#14140F]": !dark };
  const borderColor = { "border-[#F5FFF5]": dark, "border-[#14140F]": !dark };

  return (
    <>
      <Link
        className={classnames(
          "relative hidden md:flex flex-col justify-between aspect-[3/2] h-full",
          "bg-cover bg-center rounded-lg bg-container-variant",
          textColor,
          className,
        )}
        style={image ? { backgroundImage: `url(${image})` } : {}}
        href={path.join("/events", slug)}
      >
        <div
          className={classnames("px-4 pt-4 pb-8 z-10", {
            "rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent":
              darken_image,
          })}
        >
          <h3 className="h2 mb-3.5">{title}</h3>
          <p className="body-sm">{description}</p>
        </div>
        <div
          className={classnames("px-4 pb-4 pt-8 z-10", {
            "rounded-b-lg bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent":
              darken_image,
          })}
        >
          <hr className={classnames("hr-horizontal mb-3.5", borderColor)} />
          <div className="flex justify-between body-sm h-[2.68em]">
            <p className="break-words line-clamp-2 text-ellipsis mr-3.5">
              {location}
            </p>
            <NoSsr>
              <DateRange
                starts={generateDisplayDate(starts, timezone, "system")}
                ends={generateDisplayDate(ends, timezone, "system")}
              />
            </NoSsr>
          </div>
        </div>
      </Link>
      <Link
        className={classnames(
          "relative flex md:hidden flex-col justify-between aspect-[3/2]",
          "bg-cover bg-center rounded-lg bg-container-variant",
          textColor,
          className,
        )}
        style={image ? { backgroundImage: `url(${image})` } : {}}
        href={path.join("/events", slug)}
      >
        <div
          className={classnames("px-4 pt-4 z-10", {
            "rounded-t-lg bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent":
              darken_image,
          })}
        >
          <h3 className="h3 mb-3.5">{title}</h3>
          <p className="body-sm">{description}</p>
        </div>
        <div
          className={classnames("px-4 pb-4 z-10", {
            "rounded-b-lg bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent":
              darken_image,
          })}
        >
          <hr className={classnames("hr-horizontal mb-3.5", borderColor)} />
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
