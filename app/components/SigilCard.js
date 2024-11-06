"use client";
import { useState, useEffect } from "react";
import { sigil, reactRenderer, stringRenderer } from "urbit-sigil-js";

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
  }

  useEffect(() => {
    let x = randomShip();
    setUrbitId(decimalDelimit(x))
    let p = ob.patp(x);
    const s = sigil({
      patp: p,
      renderer: stringRenderer,
      size: 128,
      colors: ['#14140f', 'white'],
    })
    setSvgString(s)
    // console.log(s)
    setName(p);
    // console.log("random ship", x, p);
  }, []);
  
  return (
    <div className="md:absolute w-full h-full font-[600] flex items-center justify-center md:translate-y-[-3rem]">
      <div className="md:w-[34svw] md:h-[20svw] border-2 border-white rounded-xl flex flex-col justify-between p-8">
        <div>-</div>
        <img className="absolute w-[50px]" src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`} />
        <h1 className="text-[2.5rem] leading-[100%] w-full text-center">
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
          <div className="flex flex-col justify-end w-full text-[12px] ">
             {urbitId}
            {/* <span className="border-2 border-white flex w-auto">L1</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
