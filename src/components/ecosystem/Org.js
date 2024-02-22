import React from "react";
import Link from "next/link";
import path from "path";
import classnames from "classnames";

export default function Org({
  className = "",
  title,
  description,
  image,
  slug,
  extended = false,
}) {
  return (
    <Link href={path.join("/ecosystem", "orgs", slug)}>
      <div
        className={classnames(
          "relative flex flex-col aspect-square bg-brite p-2 sm:p-4",
          { "rounded-xl": !extended, "rounded-t-xl": extended },
          className
        )}
      >
        {!extended && <h3 className="h3 absolute text-black">{title}</h3>}
        <div className="flex-1 flex text-center items-center">
          <img className="w-1/2 m-auto" src={image} />
        </div>
      </div>
      {extended && (
        <div className="bg-tint rounded-b-xl p-2 sm:p-4">
          <h3 className="h2 text-brite mb-2 line-clamp-1 text-ellipsis break-all">
            {title}
          </h3>
          <div className="hidden xs:block">
            <p className="body-md text-lite h-[3.9em] line-clamp-3 text-ellipsis overflow-hidden">
              {description}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}
