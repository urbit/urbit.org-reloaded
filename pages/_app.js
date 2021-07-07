import "tailwindcss/tailwind.css";
import { useState } from "react";
import { configure, GlobalHotKeys } from "react-hotkeys";
import Search from "../components/Search";
import "../styles/globals.css";
import "../styles/prism.css";

function MyApp({ Component, pageProps }) {
  const [showSearch, toggleSearch] = useState(false);

  const invertToggle = (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    toggleSearch((state) => !state);
  };
  const keyMap = { search: ["command+k", "ctrl+k", "esc"] };
  const handlers = { search: (event) => invertToggle(event) };
  configure({
    ignoreTags: [],
    stopEventPropagationAfterHandling: true,
  });

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <Search
        showSearch={showSearch}
        toggleSearch={() => toggleSearch(false)}
      />
      <Component {...pageProps} toggleSearch={invertToggle} />
    </>
  );
}

export default MyApp;
