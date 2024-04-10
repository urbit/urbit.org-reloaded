import React from "react";
import Link from "next/link";
import path from "path";
import classnames from "classnames";

export default function AppCard({
  className,
  title,
  description,
  slug,
  bgColor,
  image,
}) {
  const bg = !bgColor && "bg-container-variant";
  return (
    <Link
      className={classnames("flex flex-col", className)}
      href={path.join("/ecosystem", "apps", slug)}
    >
      <div
        className={classnames(
          "flex justify-center items-center aspect-square rounded-t-xl",
          bg
        )}
        style={{ backgroundColor: bgColor }}
      >
        {image && (
          <img
            className="h-full w-full rounded-t-xl object-cover object-center"
            src={image}
          />
        )}
      </div>
      <div className="bg-container-variant rounded-b-xl p-4">
        <h3 className="h3 font-semibold text-on-container line-clamp-1 text-ellipsis">
          {title}
        </h3>
        <div className="hidden md:block">
          <p className="h-[3.9em] body-md text-on-container-variant line-clamp-3 text-ellipsis">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
