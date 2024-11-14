"use client";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { usePathname } from "next/navigation";

export const HeaderNav = ({ nav, homepage }) => {
  const headerRef = useRef(null);

  const currentRoute = usePathname();

  return (
    <React.Fragment>
      {currentRoute == "/" ? (
        <div className="lg:ml-6 2xl:ml-8 mt-4 md:mt-8 headline flex w-full flex-col justify-start items-start relative before:content-['~'] before:absolute before:left-[-.6em] before:top-[-.05em] text-2xlarge lg:text-3xlarge 2xl:text-4xlarge leading-[120%]  ">
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
        <React.Fragment>
          <MobileNav nav={nav} currentRoute={currentRoute} />
          <section
            ref={headerRef}
            className="hidden md:block container fixed h-auto z-10 items-center bg-black dark:bg-white justify-center leading-120  md:pt-0 md:pb-0 pt-3 pb-3"
          >
            <div className="my-4 md:my-8 h-auto md:flex md:flex-row md:items-center md:justify-between">
              <div className="w-full leading-[1cap] flex justify-start md:grid gap-4 items-center md:justify-center md:grid-cols-6  h-full ">
                <div className="col-span-1">
                  <div className="flex font-[600] relative">
                    <Link
                      href="/"
                      className="md:hover:text-gray-87 ml-2 relative before:content-['~']  before:absolute before:left-[-.82em] before:bottom-[.08em] w-auto"
                    >
                      Urbit
                    </Link>

                    {currentRoute == "/" && (
                      <span>
                        &nbsp;is a new computing paradigm that provides complete
                        ownership of your digital world.
                      </span>
                    )}
                    {/* {currentRoute.startsWith("/overview") && (
                      <React.Fragment>
                        &nbsp;:&nbsp;
                        <Link
                          href="/overview"
                          className="md:hover:text-gray-87 capitalize"
                        >
                          Overview
                        </Link>
                      </React.Fragment>
                    )} */}
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
                  </div>
                </div>{" "}
                <div className="col-span-5 hidden md:flex w-full items-center justify-start">
                  {currentRoute !== "/" && <GlobalNav nav={nav} />}
                </div>
                {/* <div className="col-span-5 flex md:hidden w-full items-center justify-start">
                {currentRoute !== "/" && <GlobalNavMobile nav={nav} />}
              </div> */}
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const OverviewNav = () => {
  const currentRoute = usePathname();
  return (
    <ul className="flex flex-row gap-x-4 text-[16px] md:text-large md:flex-col text-gray-87 col-span-6">
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

const MobileNav = ({ nav, currentRoute }) => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const routeMap = {
    "": "Menu",
    "get-on-the-network": "Get on the Network",
    overview: "Overview",
    grants: "Grants",
    events: "Events",
    blog: "Blog",
    ecosystem: "Ecosystem",
  };
  const splitRoute = currentRoute.split("/");

  useEffect(() => {}, [menuIsOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuIsOpen);
  };

  return (
    <section className="fixed w-full top-0 left-0  h-auto z-10 items-center bg-black dark:bg-white justify-center leading-120 md:pt-0 md:pb-0">
      <div className="h-[4.5rem] flex md:hidden items-center font-[600] relative w-full ">
        <div
          href="/"
          className="cursor-pointer ml-8 h-full w-full grid grid-cols-12 justify-between select-none md:hover:text-gray-87 relative "
        >
          <Link
            href="/"
            className="flex col-span-4 items-center before:content-['~'] before:absolute before:left-[-.8em] before:bottom-[1em]"
          >
            Urbit
          </Link>
          <div
            onClick={toggleMenu}
            className="col-span-8 w-full hover:bg-gray-87 flex  pr-[.7em] items-center justify-between"
          >
            <span className="ml-8">{routeMap[splitRoute[1]]}</span>
            <span className="ml-2">{menuIsOpen ? "↑" : "↓"}</span>
          </div>
        </div>
      </div>
      {currentRoute.startsWith("/overview") && (
        <div className="container bg-black mb-4 md:hidden">
          <OverviewNav />
        </div>
      )}

      <ul
        className={classNames(
          "absolute flex flex-col top-0 font-[600]  mt-[4.5rem] left-0 bg-gray-f5 h-auto w-[100vw]",
          { hidden: !menuIsOpen }
        )}
      >
        {nav?.map((navItem, i) => {
          return (
            <Link
              className="text-gray-87 leading-[1cap] hover:bg-gray-87 hover:text-white first-of-type:mt-4 last-of-type:mb-4 py-4 container select-none"
              key={`${navItem} + ${i}`}
              href={navItem.url}
              onClick={toggleMenu}
              target={navItem.external ? "_blank" : ""}
            >
              <span className="nav-button leading-inherit">
                {navItem.title}
                {navItem.url.startsWith("http") && (
                  <span className="ml-2">↗</span>
                )}
              </span>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
const GlobalNav = ({ nav }) => {
  const currentRoute = usePathname();

  return (
    <React.Fragment>
      <ul className="flex mb-0 flex-row gap-x-4 pt-0 text-large font-[600]">
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
            {navItem.external && (<span className="ml-[.2em]">↗</span>)}
            </Link>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
