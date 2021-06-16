import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import path from "path";

function ActiveLink({ children, href, className }) {
  const router = useRouter();

  const firstCrumb = router.asPath.split("/")[1];

  const activeClassName = classnames({
    "text-black": "/" + firstCrumb === href,
    "text-gray": "/" + firstCrumb !== href,
  });

  return (
    <Link href={href}>
      <a className={className + " " + activeClassName}>{children}</a>
    </Link>
  );
}

// This is the header for the index page
export default function Header() {
  return (
    <header className="layout-wide flex justify-between items-center pt-8">
      <Link href="/">
        <a className="type-ui">Urbit</a>
      </Link>
      <nav className="flex items-center">
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
        <button className="button-sm bg-wall text-gray">
          Search Urbit.org<div className="ml-4 text-lightGray">⌘K</div>
        </button>
      </nav>
    </header>
  );
}
