"use client";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import SVG from "react-inlinesvg";

export const HeaderNav = ({ nav }) => {
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  const [menuIsOpen, setMenuOpen] = useState(false);
  const currentRoute = usePathname();

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
            className="relative before:content-['~'] before:absolute before:left-[-.8em] before:bottom-[.1em] w-auto"
          >
            Urbit
          </Link>
          {currentRoute == "/" && (
            <span>
              &nbsp;is a new computing paradigm that provides complete ownership
              of your digital world.
            </span>
          )}
          {currentRoute == "/overview" && (
            <Link href="/overview" className="capitalize">
              &nbsp;:&nbsp;Overview
            </Link>
          )}
          {currentRoute == "/grants" && (
            <Link href="/grants" className="capitalize">
              &nbsp;:&nbsp;Grants
            </Link>
          )}
        </div>
        {/* if homepage, display this */}
        {/* else, display urbit: pagename (overview, grants) */}
      </div>
      <div class="grid-cols-6 gap-x-4">
        <ul className="flex flex-col text-gray-87">
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
