import { configure, GlobalHotKeys } from "react-hotkeys";
// Ensures the root container is always 100vw, min 100vh, and centers all children along the y-axis
export default function Container({ toggleSearch, children }) {
  const keyMap = { search: ["command+k", "ctrl+k", "esc"] };
  const handlers = { search: toggleSearch };
  configure({
    ignoreTags: [],
  });

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <div className="flex flex-col min-h-screen w-screen items-center">
        {children}
      </div>
    </>
  );
}
