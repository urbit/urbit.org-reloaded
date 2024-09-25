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
    <React.Fragment>
       {currentRoute == "/" && (
        <div className="absolute w-[100vw] font-[600] pb-12 flex items-center justify-center h-[100svh]">
          <NewsletterSignup className="z-10 "/>
        </div>
      )}
    <section
      ref={headerRef}
      className="fixed h-auto items-center mt-8 md:mt-0 justify-center leading-120 container"
    >
     
      <div className="min-h-[4rem] flex flex-col md:flex-row items-center justify-between relative w-full">
        <div className="absolute md:grid flex items-center justify-center md:grid-cols-6 w-full h-full">
          <div className="col-span-1"></div>
          <div className="col-span-5 flex items-center justify-start">
            {currentRoute.startsWith("/grants") && (
              <span>
                Earn a piece of the Urbit network by developing software,
                creating content, growing communities, and more.
              </span>
            )}
            {currentRoute.startsWith("/overview") && (
              <ul className="flex flex-row gap-x-4">
                <Link href="/overview" className={currentRoute === "/overview" ? "text-white" : "text-gray-87"}>
                  Introduction
                </Link>
                <Link href="/overview/urbit-os" className={currentRoute === "/overview/urbit-os" ? "text-white" : "text-gray-87"}>
                  Urbit OS
                </Link>
                <Link href="/overview/urbit-id" className={currentRoute === "/overview/urbit-id" ? "text-white" : "text-gray-87"}>
                  Urbit ID
                </Link>
                <Link href="/overview/history" className={currentRoute === "/overview/history" ? "text-white" : "text-gray-87"}>
                  History
                </Link>
              </ul>
            )}

          </div>
        </div>
        <div className="inline-block font-[600] relative">
          <Link
            href="/"
            className="hover:text-gray-87 before:hover:text-white relative before:content-['~']  before:absolute before:left-[-.8em] before:bottom-[.1em] w-auto"
          >
            Urbit
          </Link>
          {currentRoute == "/" && (
            <span>
              &nbsp;is a new computing paradigm that provides complete ownership
              of your digital world.
            </span>
          )}
          {currentRoute.startsWith("/overview") && (
            <React.Fragment>
              &nbsp;:&nbsp;
            <Link href="/overview" className="hover:text-gray-87 capitalize">
              Overview
            </Link>
            </React.Fragment>
          )}
          {currentRoute.startsWith("/grants") && (
            <React.Fragment>
            &nbsp;:&nbsp;
            <Link href="/grants" className="hover:text-gray-87 capitalize">
              Grants
            </Link>
            </React.Fragment>
          )}
        </div>
      </div>
      {currentRoute == "/" && (
        <React.Fragment>
          <div className="grid grid-cols-6 gap-x-4 font-[600]">
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

    </React.Fragment>
  );
};
