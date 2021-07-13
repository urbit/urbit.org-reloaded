import { useCallback, useRef, useState, useEffect } from "react";
import { glossary } from "../lib/glossary";
import Link from "next/link";
import { useRouter } from "next/router";

const glossarySearch = (query) => {
  return glossary.filter((entry) => {
    return query.toLowerCase() === entry.name || entry.symbol === query;
  });
};

export default function Search(props) {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleRouteChange = () => {
    setQuery("");
    setResults([]);
    setActive(false);
    props.closeSearch();
  };

  const onChange = useCallback((event) => {
    const query = event.target.value;

    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
      props.toggleSearch();
    }
  }, []);

  let glossaryResults = [];
  if (query.length) {
    glossaryResults = glossarySearch(query);
  }

  const clear = useCallback((e) => {
    e.stopPropagation();
    setQuery("");
  }, []);

  // Locks document scrolling when search is open
  if (typeof document !== "undefined") {
    if (props.showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }

  if (props.showSearch) {
    return (
      <div
        onClick={props.closeSearch}
        className="fixed w-screen h-screen bg-washedWall z-50 flex flex-col items-center p-4"
      >
        <div
          className="relative flex flex-col max-w-screen-lg md:my-32 w-full md:w-10/12 lg:w-8/12 xl:w-6/12 rounded-xl bg-white min-h-0"
          ref={searchRef}
        >
          <div className="relative">
            <input
              className="text-lg md:text-xl lg:text-2xl font-medium text-green bg-transparent py-2 px-4 outline-none relative w-full"
              onChange={onChange}
              onFocus={onFocus}
              placeholder="Search..."
              type="text"
              value={query}
              onClick={(e) => e.stopPropagation()}
              autoFocus={true}
            />

            <span
              onClick={props.toggleSearch}
              className="absolute cursor-pointer right-1.5 top-1.5 md:right-2 md:top-2 lg:right-2.5 lg:top-2.5"
            >
              <p className="px-2 h-8 bg-wall flex items-center justify-center text-sm rounded">
                ESC
              </p>
            </span>
          </div>

          <div
            className={"overflow-y-scroll" + (query.length > 0 ? "" : "hidden")}
          >
            <div>
              {active &&
              results.length === 0 &&
              glossaryResults.length === 0 &&
              query !== "" ? (
                <div className="flex font-semibold text-sm p-3 py-8 w-full">
                  <p className="mr-2 text-gray">No Results found for</p>
                  <p className="font-semibold">"{query}"</p>
                </div>
              ) : null}
              {active && glossaryResults.length > 0 ? (
                <>
                  <div className="sticky top-0 flex font-semibold text-sm p-3 py-1 w-full bg-ultraDeepWall text-white">
                    <p className="font-semibold text-sm">Glossary</p>
                  </div>

                  {glossaryResults.map(({ name, link, desc, symbol }) => {
                    return (
                      <Link href={link} as={link} key={link}>
                        <div className="cursor-pointer hover:bg-wall">
                          <div className="font-semibold p-3">
                            {symbol.length > 0 && (
                              <code className="mr-1 bg-wall rounded px-1 py-0.5">
                                {symbol}
                              </code>
                            )}
                            {name}
                            <p className="font-normal text-base mt-1">{desc}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : null}
              {active && results.length > 0 && (
                <>
                  <div className="sticky top-0 flex font-semibold text-sm p-3 py-1 w-full bg-ultraDeepWall text-white">
                    <p className="font-semibold text-sm">
                      {results.length} results for "{query}"
                    </p>
                  </div>

                  {results
                    .filter((e) => e.parent !== "Glossary")
                    .map(({ title, slug, content, parent }) => {
                      return (
                        <div
                          key={slug}
                          className="cursor-pointer hover:bg-wall p-3"
                        >
                          <Link href={slug} as={slug}>
                            <div>
                              <p className="font-medium text-base">
                                {parent} / {title}
                              </p>
                              <p className="text-base font-regular text-small text-gray">
                                {content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
