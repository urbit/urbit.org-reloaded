import { useCallback, useRef, useState } from "react";
import { glossary } from "../lib/glossary";
import Link from "next/link";

const glossarySearch = (query) => {
  return glossary.filter((entry) => {
    return query.toLowerCase() === entry.name || entry.symbol === query;
  });
};

export default function Search(props) {
  const searchRef = useRef(null);
  const [query, SetQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;

    SetQuery(query);
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
    SetQuery("");
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
      <div className="fixed w-screen h-screen bg-washedWall z-50 flex flex-col items-center">
        <div
          className="relative my-32 flex flex-col max-w-screen-lg w-10/12 md:w-10/12 lg:w-8/12 xl:w-6/12 rounded-xl bg-white min-h-0"
          ref={searchRef}
        >
          <div className="">
            <input
              className="text-2xl font-medium text-green bg-transparent py-2 px-4 outline-none relative w-full"
              onChange={onChange}
              onFocus={onFocus}
              placeholder="Search..."
              type="text"
              value={query}
              autoFocus={true}
            />

            <span
              onClick={props.toggleSearch}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <p className="px-2 h-8 bg-wall flex items-center justify-center text-sm rounded">
                ESC
              </p>
            </span>
          </div>

          <div
            className={
              "overflow-scroll min-h-0 pb-2" +
              (query.length > 0 ? "" : "hidden")
            }
          >
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
              <div>
                <div className="flex font-semibold text-sm p-3 py-1 w-full bg-ultraDeepWall text-white">
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
              </div>
            ) : null}
            {active && results.length > 0 && (
              <ul className="">
                <div>
                  <p className="font-semibold text-sm p-3 py-1 bg-ultraDeepWall text-white">
                    {results.length} results for "{query}"
                  </p>
                </div>
                {results
                  .filter((e) => e.parent !== "Glossary")
                  .map(({ title, slug, content, parent }) => {
                    return (
                      <li
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
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
