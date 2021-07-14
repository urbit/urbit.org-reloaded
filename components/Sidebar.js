import Link from "next/link";
import { useState } from "react";
import MenuTray from "./MenuTray";

export default function Sidebar(props) {
  const [isOpen, setTray] = useState(false);
  return (
    <>
      <div className="hidden md:flex flex-col w-96 bg-wall max-h-screen h-screen">
        <header className="flex flex-shrink-0 justify-between items-center pl-6 pt-12 pb-8">
          <Link href="/">
            <a className="type-ui text-gray">Urbit</a>
          </Link>
        </header>
        <div className="overflow-y-scroll p-6 pt-16">
          {props.children}
          <div className="pb-32" />
        </div>
      </div>

      <MenuTray isOpen={isOpen} setTray={setTray}>
        <header className="flex flex-shrink-0 justify-between items-center pb-8">
          <Link href="/">
            <a className="type-ui text-gray">Urbit</a>
          </Link>
        </header>
        {props.children}
        <div className="pt-64" />
      </MenuTray>
    </>
  );
}
