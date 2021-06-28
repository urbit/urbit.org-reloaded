import "tailwindcss/tailwind.css";
import { useState } from "react";
import { configure, GlobalHotKeys } from "react-hotkeys";
import Search from "../components/Search";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [showSearch, toggleSearch] = useState(false);

  const invertToggle = () => toggleSearch((state) => !state);
  const keyMap = { search: ["command+k", "ctrl+k", "esc"] };
  const handlers = { search: invertToggle };
  configure({
    ignoreTags: [],
  });

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      {showSearch && <Search toggleSearch={() => toggleSearch(false)} />}
      <Component {...pageProps} toggleSearch={invertToggle} />
    </>
  );
}

export default MyApp;
