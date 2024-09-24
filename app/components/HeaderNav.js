"use client";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { usePathname } from "next/navigation";
import { NewsletterSignup } from "./NewsletterSignup";
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
      className="fixed h-auto items-center mt-8 md:mt-0 justify-center leading-120"
    >
      {currentRoute == "/" && (
        <div className="absolute w-[100vw] font-[600] -z-10 pb-12 flex items-center justify-center h-[100svh]">
          <NewsletterSignup />
        </div>
      )}
      <div className="ml-[3rem] min-h-[4rem] flex flex-row items-center justify-between relative w-[100vw] ">
        <div className="absolute grid grid-cols-6 w-full h-full ">
          <div className="col-span-1"></div>
          <div className="col-span-5 flex items-center justify-start -translate-x-[1rem]">
            {currentRoute == "/grants" && (
              <span>
                Earn a piece of the Urbit network by developing software,
                creating content, growing communities, and more.
              </span>
            )}
          </div>
        </div>
        <div className="inline-block font-[600] relative">
          <Link
            href="/"
            className="relative before:content-['~']  before:absolute before:left-[-.8em] before:bottom-[.1em] w-auto"
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
      {currentRoute == "/" && (
        <React.Fragment>
          <div className=" ml-[3rem] grid grid-cols-6 gap-x-4 font-[600]">
            <ul className="flex flex-col text-gray-87 ">
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
        </React.Fragment>
      )}
    </section>
  );
};
