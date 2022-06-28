import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import classnames from "classnames";
import MenuTray from "../components/MenuTray";
import { capitalize } from "../lib/lib";

function ActiveLink({ children, href, className, currentPath }) {
  const firstCrumb = currentPath.split("/")[1];

  const activeClassName = classnames({
    "text-wall-600": "/" + firstCrumb === href,
    "text-wall-500": "/" + firstCrumb !== href,
  });

  return (
    <Link href={href} passHref>
      <a className={`${className} ${activeClassName}`}>{children}</a>
    </Link>
  );
}

export default function Header(props) {
  const [isOpen, setTray] = useState(false);

  const currentPath = useRouter().asPath;

  const routeDepth = currentPath.split("/").length;

  const firstCrumb = currentPath.split("/")[1];

  return (
    <header className="layout px-4 md:px-8 flex justify-between items-center pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12 lg:pb-24">
      <div>
        <Link href="/" passHref>
          <a className="font-semibold text-lg">Urbit</a>
        </Link>
        {routeDepth > 2 ? (
          <Link href={`/${firstCrumb}`} passHref>
            <a className="inline md:hidden type-ui text-wall-500 ml-2">
              {capitalize(firstCrumb)}
            </a>
          </Link>
        ) : null}
      </div>
      {
        // Large screen header
      }
      <nav className="items-center hidden md:flex">
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/using"
        >
          Manual
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/blog"
        >
          Blog
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/events"
        >
          Events
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/faq"
        >
          FAQ
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 text-green-400 type-ui button-text"
          href="/getting-started"
        >
          Get Started
        </ActiveLink>
      </nav>

      {
        // Small screen header
      }
      <MenuTray isOpen={isOpen} setTray={setTray} search={props.search}>
        <Link href="/" passHref>
          <a className="type-ui mb-12">Urbit</a>
        </Link>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/manual"
        >
          Manual
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/blog"
        >
          Blog
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/events"
        >
          Events
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 text-green-400 type-h3"
          href="/getting-started"
        >
          Get Started
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/faq"
        >
          FAQ
        </ActiveLink>
      </MenuTray>
    </header>
  );
}
