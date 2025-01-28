"use client";
import { useState, useEffect } from "react";
import { sigil, reactRenderer, stringRenderer } from "urbit-sigil-js";
import classNames from "classnames";

export const SigilCard = () => {
  const ob = require("urbit-ob");

  const [urbitId, setUrbitId] = useState(null);
  const [name, setName] = useState(null);
  const [svgString, setSvgString] = useState(null);

  const randInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const randomShip = () => {
    let bits = 32;
    return randInt(Math.pow(2, bits) - 1);
  };

  // write function to decimal delimit every third number
  const decimalDelimit = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const generateNewShip = () => {
    let x = randomShip();
    setUrbitId(decimalDelimit(x));
    let p = ob.patp(x);
    const s = sigil({
      patp: p,
      renderer: stringRenderer,
      size: 128,
      colors: ["#14140f", "white"],
    });
    setSvgString(s);
    setName(p);
  };
  useEffect(() => {
    generateNewShip();
    setInterval(() => {
      generateNewShip();
    }, 5000);
  }, []);

  return (
    <div onClick={generateNewShip} className="cursor-pointer sigil-card mb-12 w-full h-full flex items-center justify-center">
      <div className="w-[30rem] xl:w-[35rem] h-[16rem] xl:h-[20rem] border-2 border-gray-87 rounded-xl flex flex-col justify-between pt-6 px-6 pb-5 md:pt-10 md:px-10 md:pb-8">
        <div className="h-0 relative">
          <img
          className={classNames("absolute w-[50px] transition-all", {
            "bg-white w-[20px] h-[25px] blur-[1rem]": !svgString,
          })}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`}
        />
        </div>
        <h1 className="xl:text-2xlarge font-[400] pt-6 2xl:text-3xlarge leading-[100%] w-full text-center">
          {name}
        </h1>

        <div className="flex flex-row font-[600]">
          <div className="flex flex-col w-full text-base xl:text-large gap-y-2 ">
            <div className="flex flex-row ">
              <div className="w-[50%]">
                <span></span>
                <span className="ml-2">Star</span>
              </div>
              <div>~ marbus</div>
            </div>
            <div className="flex flex-row">
              <div className="w-[50%]">
              <span></span>
              <span className="ml-2">Galaxy</span></div>
              <div>~ zod</div>
            </div>
          </div>
          <div className="flex flex-row gap-x-4 justify-start translate-y-[.4em] w-full text-small items-end ">
            <div className="">
              <span className=""></span>
              <span className="ml-2">{urbitId}</span>
              </div>
            {/* <span className="border-2 border-white flex w-auto">L1</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
