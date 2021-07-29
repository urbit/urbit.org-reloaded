import Section from "./Section";
import { useState, useEffect } from "react";
import { TableOfContents } from "./TableOfContents";

export default function ContentArea(props) {
  const [shortcut, setShortcut] = useState("");

  const detectOS = () => {
    const agent = window.navigator.appVersion;
    if (agent.includes("Win")) {
      return "Ctrl+K";
    } else if (agent.includes("Mac")) {
      return "⌘K";
    } else if (agent.includes("Linux")) {
      return "Ctrl+K";
    }
  };

  useEffect(() => {
    setShortcut(detectOS());
  }, []);

  return (
    <div className="w-full min-w-0 flex flex-col items-center">
      <div className="px-4 md:px-12 lg:px-24 pb-24 pt-8 md:pt-10 lg:pt-16 flex flex-col w-full max-w-screen-xl max-h-screen h-screen overflow-y-scroll">
        <div className="flex justify-between w-full items-center flex-shrink-0">
          <div className="type-ui text-gray">{props.breadcrumbs}</div>
          <div className="hidden md:block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.search.toggleSearch();
              }}
              className="bg-wall text-gray flex px-4 py-1 rounded-lg type-ui"
            >
              Search<div className="ml-4 text-lightGray">{shortcut}</div>
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {props.narrow ? (
            <Section narrow className={""}>
              <h2 className="mb-16 mt-24">{props.title}</h2>
              {props.children}
              <div className="pb-32" />
            </Section>
          ) : (
            <div className="min-w-0">
              <h2 className="mb-16 mt-24">{props.title}</h2>
              {props.children}
              <div className="pb-32" />
            </div>
          )}
          <TableOfContents
            key={props.params.slug?.join("/") || Math.random()}
          />
        </div>
      </div>
    </div>
  );
}
