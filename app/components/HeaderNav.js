"use client";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { usePathname } from "next/navigation";

export const HeaderNav = ({ nav, homepage }) => {
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
      {currentRoute == "/" ? (
        <div className="ml-4 mt-4 md:ml-8 md:mt-8 headline flex w-full flex-col justify-start items-start relative before:content-['~'] before:absolute before:left-[-.6em] before:top-[-.05em] text-[2rem] lg:text-[3.75rem] leading-[120%]  ">
          <h1 className="font-[300]">{homepage.headline}</h1>
          <div className="flex flex-col md:flex-row gap-x-8 font-[300] text-gray-400 underline underline-offset-[.1em] decoration-2">
            {homepage.links.map((link, i) => {
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className=""
                  target={link.external ? "_blank" : ""}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <section
          ref={headerRef}
          className="container fixed h-auto z-10 items-center bg-black dark:bg-white justify-center leading-120  md:pt-0 md:pb-0 pt-5 pb-3"
        >
          <div className="my-4 md:my-8 h-auto md:flex md:flex-row md:items-center md:justify-between">
            <div className="w-full leading-[1cap] flex justify-start md:grid gap-4 items-center md:justify-center md:grid-cols-6  h-full ">
              <div className="col-span-1">
                <div className="inline-block font-[600] relative">
                  <Link
                    href="/"
                    className="md:hover:text-gray-87 ml-2 relative before:content-['~']  before:absolute before:left-[-.8em] before:bottom-[.3em] w-auto"
                  >
                    Urbit
                  </Link>

                  {currentRoute == "/" && (
                    <span>
                      &nbsp;is a new computing paradigm that provides complete
                      ownership of your digital world.
                    </span>
                  )}
                  {currentRoute.startsWith("/overview") && (
                    <React.Fragment>
                      &nbsp;:&nbsp;
                      <Link
                        href="/overview"
                        className="md:hover:text-gray-87 capitalize"
                      >
                        Overview
                      </Link>
                    </React.Fragment>
                  )}
                  {currentRoute.startsWith("/grants") && (
                    <React.Fragment>
                      &nbsp;:&nbsp;
                      <Link
                        href="/grants"
                        className="md:hover:text-gray-87 capitalize"
                      >
                        Grants
                      </Link>
                    </React.Fragment>
                  )}
                  {currentRoute.startsWith("/overview") && (
                    <div className="mt-4 md:hidden">
                      {/* <OverviewNav /> */}
                    </div>
                  )}
                  {/* {currentRoute.startsWith("/grants") && (
              <div className="mt-4 md:hidden">
                <span class="tracking-[.02em] font-[600]">
                  Earn a piece of the Urbit network by developing software,
                  creating content, growing communities, and more.
                </span>
              </div>
            )} */}
                </div>
              </div>{" "}
              <div className="col-span-5 hidden md:flex w-full items-center justify-start">
                {/* {currentRoute.startsWith("/grants") && (
                  <span className="tracking-[.02em] font-[600]">
                    Earn a piece of the Urbit network by developing software,
                    creating content, growing communities, and more.
                  </span>
                )} */}
                {currentRoute !== "/" && <GlobalNav nav={nav} />}
              </div>
            </div>
          </div>

          {currentRoute.startsWith("/overview") && (
            <React.Fragment>
              <div className="absolute grid grid-cols-6 gap-x-4 font-[600] md:mt-[2.06rem] bg-black md:bg-transparent w-full md:w-auto pb-4">
                <OverviewNav />
              </div>
            </React.Fragment>
          )}
        </section>
      )}
    </React.Fragment>
  );
};

const OverviewNav = () => {
  const currentRoute = usePathname();
  return (
    <ul className="flex flex-row gap-x-4 md:flex-col text-gray-87 col-span-6">
      <Link
        className={currentRoute === "/overview" ? "text-white" : "text-gray-87"}
        href="/overview"
      >
        <span className="nav-button">Introduction</span>
      </Link>
      <Link
        className={
          currentRoute === "/overview/urbit-os" ? "text-white" : "text-gray-87"
        }
        href="/overview/urbit-os"
      >
        <span className="nav-button">Urbit OS</span>
      </Link>
      <Link
        className={
          currentRoute === "/overview/urbit-id" ? "text-white" : "text-gray-87"
        }
        href="/overview/urbit-id"
      >
        <span className="nav-button">Urbit ID</span>
      </Link>
      <Link
        className={
          currentRoute === "/overview/history" ? "text-white" : "text-gray-87"
        }
        href="/overview/history"
      >
        <span className="nav-button">History</span>
      </Link>
    </ul>
  );
};
const GlobalNav = ({ nav }) => {
  const currentRoute = usePathname();

  return (
    <ul className="flex mb-0 flex-row gap-x-4 pt-0 text-20px font-[600]">
      {nav?.map((navItem, i) => {
        return (
          <Link
            className={
              currentRoute.startsWith(navItem.url)
                ? "nav-button-selected"
                : "text-gray-87"
            }
            key={`${navItem} + ${i}`}
            href={navItem.url}
            target={navItem.external ? "_blank" : ""}
          >
            <span className="nav-button">{navItem.title}</span>
          </Link>
        );
      })}
      {/* <Link
        href="/overview"
        className={currentRoute === "/overview" ? "text-white" : "text-gray-87"}
      >
        Introduction
      </Link>
      <Link
        href="/overview/urbit-os"
        className={
          currentRoute === "/overview/urbit-os" ? "text-white" : "text-gray-87"
        }
      >
        Urbit OS
      </Link>
      <Link
        href="/overview/urbit-id"
        className={
          currentRoute === "/overview/urbit-id" ? "text-white" : "text-gray-87"
        }
      >
        Urbit ID
      </Link>
      <Link
        href="/overview/history"
        className={
          currentRoute === "/overview/history" ? "text-white" : "text-gray-87"
        }
      >
        History
      </Link> */}
    </ul>
  );
};
