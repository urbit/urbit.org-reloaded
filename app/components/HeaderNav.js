"use client";
import Link from "next/link";
import classNames from "classnames";
import { sequenceAnimation } from "../lib/globals";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";

export const HeaderNav = ({ nav }) => {
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  const [menuIsOpen, setMenuOpen] = useState(false);

  useEffect(() => {}, [menuIsOpen]);

  const toggleMenu = () => {
    setMenuOpen(true);
  };

  useEffect(() => {}, []);

  return (
    <section ref={headerRef} className="fixed mt-28px h-[100px] leading-120 container">
      <div className="flex flex-row w-full justify-between">
        <Link
          href="/"
          className="mb-4 relative before:content-['~'] before:absolute before:left-[-.8em] before:bottom-[.1em] w-auto"
        >
          {/* if homepage, display this */}
          Urbit is a new computing paradigm that provides complete ownership of your digital world.
          {/* else, display urbit: pagename (overview, grants) */}
        </Link>

        <ul className="">
          {nav?.map((navItem, i) => {
            return (
              <Link
                className={classNames("menu-item group/nav", {
                  "has-children": navItem.submenu,
                })}
                key={`${navItem} + ${i}`}
                href={navItem.url}
                target={navItem.external ? "_blank" : ""}
              >
                <span className="nav-button">{navItem.title}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
