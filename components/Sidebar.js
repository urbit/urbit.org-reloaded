import Link from "next/link";
import { useState } from "react";
import MenuTray from "./MenuTray";

export default function Sidebar(props) {
  const [isOpen, toggleTray] = useState(false);
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

      <div className="block md:hidden">
        <MenuTray isOpen={isOpen} toggleTray={toggleTray}>
          <header className="flex flex-shrink-0 justify-between items-center pb-8">
            <Link href="/">
              <a className="type-ui text-gray">Urbit</a>
            </Link>
          </header>
          {props.children}
        </MenuTray>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.search.toggleSearch(e);
          }}
          className={`z-10 fixed px-4 items-center justify-center type-ui rounded-xl h-16 bg-white text-gray left-4 right-4 bottom-4 mobile-search-button-width ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          Search
        </button>
        <button
          onClick={() => toggleTray(!isOpen)}
          className="z-10 fixed bottom-4 right-4 w-16 h-16 bg-ultraDeepWall flex items-center justify-center rounded-full"
        >
          {isOpen ? (
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
                d="M0.39382 13.7045C-0.131273 14.2296 -0.131274 15.081 0.39382 15.6061C0.918913 16.1312 1.77026 16.1312 2.29535 15.6061L7.99999 9.90142L13.7047 15.6061C14.2297 16.1312 15.0811 16.1312 15.6062 15.6061C16.1313 15.081 16.1313 14.2296 15.6062 13.7046L9.90152 7.99989L15.6061 2.29535C16.1312 1.77026 16.1312 0.918913 15.6061 0.39382C15.081 -0.131273 14.2296 -0.131273 13.7045 0.39382L7.99999 6.09836L2.29548 0.393844C1.77038 -0.131249 0.919038 -0.13125 0.393945 0.393844C-0.131148 0.918937 -0.131148 1.77028 0.393945 2.29537L6.09846 7.99989L0.39382 13.7045Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="3" rx="1.5" fill="white" />
              <rect y="7" width="16" height="3" rx="1.5" fill="white" />
              <rect y="14" width="16" height="3" rx="1.5" fill="white" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
