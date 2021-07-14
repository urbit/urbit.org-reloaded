import classnames from "classnames";

export default function MenuTray(props) {
  // Locks document scrolling when menu is open

  if (typeof document !== "undefined") {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }

  // Slides the tray in or out from the left
  const trayClasses = classnames({
    "tray-menu-open": props.isOpen,
    "tray-menu-closed": !props.isOpen,
  });

  // Fades the background overlay in or out
  const overlayClasses = classnames({
    "tray-overlay-open": props.isOpen,
    "tray-overlay-closed": !props.isOpen,
  });

  // Hides or shows the menu
  const menuClasses = classnames({
    "menu-open": props.isOpen,
    "menu-closed": !props.isOpen,
  });

  return (
    <nav className={`z-10 w-screen h-screen top-0 left-0 fixed ${menuClasses}`}>
      <div
        onClick={() => props.toggleTray(!props.isOpen)}
        className={`bg-washedWhite w-screen h-screen ${overlayClasses}`}
      />
      <div
        className={`absolute bg-wall h-screen top-0 left-0 tray-menu-width overflow-y-scroll mb-24 ${trayClasses}`}
      >
        <div className="flex flex-col px-4 md:px-8 pt-8 md:pt-10 lg:pt-12">
          {props.children}
        </div>
      </div>
    </nav>
  );
}
