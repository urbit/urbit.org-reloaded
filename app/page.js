// import MarkdocComponent from 'components/MarkdocComponent';
import React from "react";
import { SigilCard } from "./components/SigilCard";

export default async function HomePage() {
  return (
    <div className="z-[-100] h-auto flex items-center justify-center  2xl:max-w-none top-0 w-full  mb-[2.5rem] md:mb-[3.5rem] 2xl:mb-[4.875rem] !mt-[0px]">
      <SigilCard />
    </div>
  );
}

export const homepageText = () => {
  <div className="text-size-homepage  inline-block leading-[110%] tracking-[.03em] font-[300]">
    <div className="hidden md:block">
      <span className="">
        A change in strategy, the Urbit project is rebooting.
      </span>
      <br />
      <span className="">
        Our vision hasn’t changed, but how we get there has.
      </span>
      <br />
      <span className="text-gray-87">What’s coming is worth the wait. </span>
      <br />
      <span className="text-gray-87">
        Sign up below to be the first to know.
      </span>
    </div>
    <div className="block md:hidden">
      <span className="">
        A change in strategy, the Urbit project is rebooting. Our vision hasn’t
        changed, but how we get there has.{" "}
      </span>
      <span className="text-gray-87">
        What’s coming is worth the wait. Sign up below to be the first to know.
      </span>
    </div>
  </div>;
};
