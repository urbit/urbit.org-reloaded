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
    <div className="sigil-card  w-full h-full font-[600] flex items-center justify-center">
      <div className="w-full max-w-[33rem] md:min-w-[30rem] md:w-[35rem] h-[20rem] border-2 border-white rounded-xl flex flex-col justify-between pt-10 px-10 pb-8">
        <div className="h-0 relative">
          <img
          className={classNames("absolute w-[50px] transition-all", {
            "bg-white w-[20px] h-[25px] blur-[1rem]": !svgString,
          })}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`}
        />
        </div>
        <h1 className="text-2xlarge pt-6 lg:text-3xlarge leading-[100%] w-full text-center">
          {name}
        </h1>

        <div className="flex flex-row">
          <div className="flex flex-row w-full">
            <div className="flex flex-col">
              <div>&nbsp;star</div>
              <div>&nbsp;galaxy</div>
            </div>
            <div className="flex flex-col ml-4">
              <div>~ marbus</div>
              <div>~ zod</div>
            </div>
          </div>
          <div className="flex flex-col justify-end w-full text-small">
             {urbitId}
            {/* <span className="border-2 border-white flex w-auto">L1</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
