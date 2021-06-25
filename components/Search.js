import { useCallback, useRef, useState } from "react";
import { glossary } from "../lib/glossary";
import Link from "next/link";

const glossarySearch = (query) => {
  return glossary.filter((entry) => {
    return query.toLowerCase() === entry.name || entry.symbol === query;
  });
};

export default function Search() {
  const searchRef = useRef(null);
  const [query, SetQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const [hidden, toggle] = useState(true);
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
    }
  }, []);

  let glossaryResults = [];
  if (query.length) {
    glossaryResults = glossarySearch(query);
  }

  const clear = useCallback(() => {
    SetQuery("");
  }, []);

  return (
    <div
      className={
        "fixed w-screen h-screen bg-black bg-opacity-30 z-50 flex flex-col " +
        (hidden ? "hidden" : "")
      }
      ref={searchRef}
    >
      <div className="p-12 w-100 flex flex-col min-h-0">
        <div className="relative flex flex-col">
          <input
            className="bg-white type-ui text-green rounded-xl border-transparent p-2 outline-none relative"
            onChange={onChange}
            onFocus={onFocus}
            placeholder="Search..."
            type="text"
            value={query}
          />
          {query.length > 0 && (
            <span
              onClick={clear}
              className="absolute right-3"
              style={{ top: 13 }}
            >
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
                  d="M0.39382 13.7045C-0.131273 14.2296 -0.131274 15.081 0.39382 15.6061C0.918913 16.1312 1.77026 16.1312 2.29535 15.6061L7.99999 9.90142L13.7047 15.6061C14.2297 16.1312 15.0811 16.1312 15.6062 15.6061C16.1313 15.081 16.1313 14.2296 15.6062 13.7046L9.90152 7.99989L15.6061 2.29535C16.1311 1.77026 16.1312 0.918913 15.6061 0.39382C15.081 -0.131273 14.2296 -0.131273 13.7045 0.39382L7.99999 6.09836L2.29548 0.393844C1.77038 -0.131249 0.919038 -0.131249 0.393945 0.393844C-0.131148 0.918937 -0.131148 1.77028 0.393945 2.29537L6.09846 7.99989L0.39382 13.7045Z"
                  fill="black"
                  fill-opacity="0.6"
                />
              </svg>
            </span>
          )}
        </div>
        <div
          className={
            "bg-white overflow-scroll min-h-0 rounded-xl border-transparent mt-2 " +
            (query.length > 0 ? "" : "hidden")
          }
        >
          {active && glossaryResults.length > 0 && (
            <ul>
              {glossaryResults.map(({ name, link, desc, symbol }) => {
                return (
                  <div className="border-b border-gray">
                    <p className="font-semibold text-sm pb-4 text-gray pl-3 pt-2">
                      Glossary Result
                    </p>
                    <li key={link} className="cursor-pointer hover:bg-wall">
                      <Link href={link} as={link}>
                        <div className="font-semibold px-3">
                          {symbol.length > 0 && (
                            <code className="mr-1">{symbol}</code>
                          )}
                          {name}
                          <p className="font-normal text-base pt-1 pb-4">
                            {desc}
                          </p>
                        </div>
                      </Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          )}
          {active && results.length > 0 && (
            <ul className="p-2">
              <div>
                <p className="font-semibold text-sm pb-4 text-gray">
                  {results.length} results for "{query}"
                </p>
              </div>
              {results
                .filter((e) => e.parent !== "Glossary")
                .map(({ title, slug, content, parent }) => {
                  return (
                    <li key={slug} className="cursor-pointer hover:bg-wall">
                      <Link href={slug} as={slug}>
                        <div>
                          <p className="font-medium text-base">
                            {parent} / {title}
                          </p>
                          <p className="text-base font-regular">{content}</p>
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
