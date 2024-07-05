import React from "react";
import Link from "next/link";
import path from "path";
import classnames from "classnames";

export default function Org({
  className = "",
  title,
  description,
  image,
  href,
  slug,
  extended = false,
}) {
  return (
    <Link href={href || path.join("/ecosystem", "orgs", slug || "")}>
      <div
        className={classnames(
          "relative flex flex-col aspect-square bg-container p-2 sm:p-4",
          { "rounded-xl": !extended, "rounded-t-xl": extended },
          className
        )}
      >
        {!extended && (
          <h3 className="h3 absolute text-on-container">{title}</h3>
        )}
        <div className="flex-1 flex text-center items-center">
          <img className="w-full h-full" src={image} />
        </div>
      </div>
      {extended && (
        <div className="bg-container rounded-b-xl p-2 sm:p-4 border-t border-on-container">
          <h3 className="h2 text-on-container mb-2 line-clamp-1 text-ellipsis break-all">
            {title}
          </h3>
          <div className="hidden xs:block">
            <p className="body-md text-on-container-variant h-[3.9em] line-clamp-3 text-ellipsis overflow-hidden">
              {description}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}
