import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import classnames from "classnames";
import path from "path";
import { useLockBodyScroll } from "../lib/hooks";

function ActiveLink({ children, href, className }) {
  const router = useRouter();

  const firstCrumb = router.asPath.split("/")[1];

  const activeClassName = classnames({
    "text-black": "/" + firstCrumb === href,
    "text-gray": "/" + firstCrumb !== href,
  });

  return (
    <Link href={href}>
      <a className={`${className} ${activeClassName}`}>{children}</a>
    </Link>
  );
}

function MenuTray(props) {
  // Locks document scrolling when menu is open
  if (typeof document !== "undefined") {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }

  const activeClasses = classnames({
    "tray-menu-open": props.isOpen,
    "tray-menu-closed": !props.isOpen,
  });

  return (
    <nav
      className={`z-9 w-screen h-screen bg-wall flex top-0 left-0 flex-col p-4 pt-24 fixed ${activeClasses}`}
    >
      {props.children}
    </nav>
  );
}

// This is the header for the index page
export default function Header(props) {
  const [isOpen, toggleTray] = useState(false);
  return (
    <header className="layout-wide flex justify-between items-center pt-12">
      <div className="absolute z-10">
        <Link href="/">
          <a className="type-ui">Urbit</a>
        </Link>
      </div>
      <Link href="/">
        <a className="type-ui text-white">Urbit</a>
      </Link>
      {
        // Large screen header
      }
      <nav className="items-center hidden md:flex">
        <ActiveLink className="mr-5 type-ui" href="/docs">
          Docs
        </ActiveLink>
        <ActiveLink className="mr-5 type-ui" href="/blog">
          Blog
        </ActiveLink>
        <ActiveLink className="mr-5 type-ui" href="/events">
          Events
        </ActiveLink>
        <button className="mr-5 text-green type-ui">Download Port</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.toggleSearch();
          }}
          className="button-sm bg-wall text-gray"
        >
          Search<div className="ml-4 text-lightGray">⌘K</div>
        </button>
      </nav>
      {
        // Small screen header
      }

      <div className="block md:hidden">
        <MenuTray isOpen={isOpen}>
          <ActiveLink className="mr-5 type-h3" href="/docs">
            Docs
          </ActiveLink>
          <ActiveLink className="mr-5 type-h3" href="/blog">
            Blog
          </ActiveLink>
          <ActiveLink className="mr-5 type-h3" href="/events">
            Events
          </ActiveLink>
          <button className="button-sm bg-wall text-gray">
            Search<div className="ml-4 text-lightGray">⌘K</div>
          </button>
        </MenuTray>
        <button
          onClick={() => toggleTray(!isOpen)}
          className="z-10 absolute right-4 top-8"
        >
          {isOpen ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.39382 13.7045C-0.131273 14.2296 -0.131274 15.081 0.39382 15.6061C0.918913 16.1312 1.77026 16.1312 2.29535 15.6061L7.99999 9.90142L13.7047 15.6061C14.2297 16.1312 15.0811 16.1312 15.6062 15.6061C16.1313 15.081 16.1313 14.2296 15.6062 13.7046L9.90152 7.99989L15.6061 2.29535C16.1312 1.77026 16.1312 0.918913 15.6061 0.39382C15.081 -0.131273 14.2296 -0.131273 13.7045 0.39382L7.99999 6.09836L2.29548 0.393844C1.77038 -0.131249 0.919038 -0.13125 0.393945 0.393844C-0.131148 0.918937 -0.131148 1.77028 0.393945 2.29537L6.09846 7.99989L0.39382 13.7045Z"
                fill="black"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="3" rx="1.5" fill="black" />
              <rect y="7" width="16" height="3" rx="1.5" fill="black" />
              <rect y="14" width="16" height="3" rx="1.5" fill="black" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
