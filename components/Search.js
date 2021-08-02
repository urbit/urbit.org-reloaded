import { useCallback, useRef, useState, useEffect, createContext } from "react";
import { glossary } from "../lib/glossary";
import Link from "next/link";
import { useRouter } from "next/router";
import { configure, HotKeys } from "react-hotkeys";
import classnames from "classnames";

const SearchContext = createContext();

const glossarySearch = (query) => {
  return glossary.filter((entry) => {
    return query.toLowerCase() === entry.name || entry.symbol === query;
  });
};

function GlossaryResult(props) {
  const selectedClassnames = classnames({
    "bg-green": props.selected,
  });

  const codeBg = classnames({
    "bg-wall": !props.selected,
    "bg-washedWhite": props.selected,
  });

  const text = classnames({
    "text-black": !props.selected,
    "text-white": props.selected,
  });

  return (
    <div
      className={`cursor-pointer ${selectedClassnames}`}
      onMouseEnter={() => props.setCursor(props.index)}
    >
      <div className="font-semibold p-3">
        <p className={`text-base ${text}`}>
          {props.symbol.length > 0 && (
            <code className={`mr-1 rounded px-1 py-0.5 ${codeBg}`}>
              {props.symbol}
            </code>
          )}
          {props.name}
        </p>
        <p className={`font-normal text-base mt-1 ${text}`}>{props.desc}</p>
      </div>
    </div>
  );
}

function Result(props) {
  const selectedClassnames = classnames({
    "bg-green": props.selected,
  });
  const text = classnames({
    "text-black": !props.selected,
    "text-white": props.selected,
  });
  const description = classnames({
    "text-gray": !props.selected,
    "text-midWhite": props.selected,
  });
  return (
    <div
      className={`cursor-pointer ${selectedClassnames}`}
      onMouseEnter={() => props.setCursor(props.index)}
    >
      <div className="p-3">
        <p className={`font-medium text-base ${text}`}>
          {props.parent !== "Content" ? `${props.parent} /` : ""} {props.title}
        </p>
        <p
          className={`text-base font-regular text-small text-gray ${description}`}
        >
          {props.content}
        </p>
      </div>
    </div>
  );
}

function Subheading(props) {
  return (
    <div className="sticky top-0 flex font-semibold text-sm p-3 py-1 w-full bg-ultraDeepWall text-white">
      <p className="font-semibold text-sm">{props.title}</p>
    </div>
  );
}

export default function Search(props) {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const [cursor, setCursor] = useState(0);
  const searchEndpoint = (query) => `/api/search?q=${query}`;
  const router = useRouter();

  const keyMap = {
    onNavUp: ["up"],
    onNavDown: ["down"],
    onSelect: ["enter"],
  };

  const handlers = {
    onNavUp: (event) => onNavUp(event),
    onNavDown: (event) => onNavDown(event),
    onSelect: (event) => onSelect(event, results[cursor]),
  };

  configure({
    // ignoreTags: [],
    ignoreTags: ["input", "select", "textarea"],
    ignoreEventsCondition: function () {},
  });

  {
    /* useEffect(() => {
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
  }; */
  }

  const onChange = useCallback((event) => {
    const query = event.target.value;

    setQuery(query);

    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          // Wrap results in an object which will tell React what component to use to render results.
          const results = res.results.map((item) => ({
            type: "RESULT",
            content: item,
          }));

          const glossaryResults = glossarySearch(query).map((item) => ({
            type: "GLOSSARY_RESULT",
            content: item,
          }));

          const list = [...glossaryResults, ...results];

          setResults(list);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    // window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
      props.toggleSearch();
    }
  }, []);

  const onSelect = () => {
    console.log(results, cursor);

    {
      /* const cursorItem = results[cursor].content
    
    
    
    if (cursorItem.link) {
      window.location.href = cursorItem.link
    }
    
    if (cursorItem.slug) {
      router.push(cursorItem.slug)
    }
    
    props.toggleSearch();
    setActive(false);
    setQuery("");
    setResults([])
    props.closeSearch(); */
    }
  };

  const onNavUp = useCallback((event) => {
    // prevents cursor from moving in search input
    event.preventDefault();
    setCursor((state) => state - 1);
  });

  const onNavDown = useCallback((event) => {
    // prevents cursor from moving in search input
    event.preventDefault();
    setCursor((state) => state + 1);
  });

  const clear = (e) => {
    e.stopPropagation();
    setQuery("");
  };

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
      <SearchContext.Provider value={42}>
        <HotKeys handlers={handlers} keyMap={keyMap}>
          <div
            onClick={props.closeSearch}
            className="fixed w-screen h-screen bg-washedWall z-50 flex flex-col items-center p-4"
          >
            <div className="relative flex flex-col max-w-screen-lg md:my-32 w-full md:w-10/12 lg:w-8/12 xl:w-6/12 rounded-xl bg-white min-h-0">
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
                className={
                  "overflow-y-scroll border-t-2 border-wall" +
                  (query.length > 0 ? "" : "hidden border-transparent")
                }
              >
                {active && query !== ""
                  ? results.map((item, index) => {
                      if (item.type === "GLOSSARY_RESULT") {
                        return (
                          <GlossaryResult
                            key={item.link + "-" + index}
                            {...item.content}
                            index={index}
                            setCursor={setCursor}
                            selected={index === cursor}
                          />
                        );
                      }

                      if (item.type === "RESULT") {
                        return (
                          <Result
                            key={item.link + "-" + index}
                            {...item.content}
                            index={index}
                            setCursor={setCursor}
                            selected={index === cursor}
                          />
                        );
                      }
                      return null;
                    })
                  : null}
              </div>
            </div>
          </div>
        </HotKeys>
      </SearchContext.Provider>
    );
  }
  return null;
}
