"use client";
import Link from "next/link";
import classNames from "classnames";
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
    <section
      ref={headerRef}
      className="fixed h-[64px] items-center justify-center leading-120 container"
    >
      <div className="flex flex-row h-full items-center w-full justify-between">
        <div className="inline-block">
          <Link
            href="/"
            className="relative before:content-['~'] !text-[21px] tracking-02 before:absolute before:left-[-.8em] before:bottom-[.1em] w-auto"
          >
            Urbit
          </Link>
          &nbsp;is a new computing paradigm that provides complete ownership of
          your digital world.
        </div>
        {/* if homepage, display this */}
        {/* else, display urbit: pagename (overview, grants) */}

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
