"use client";
import "@urbit/sigil-js";

export const SigilCard = () => {
  const config = {
    point: "~hastuc-dibtux", // or 'zod'
    size: 40,
    background: "",
    foreground: "white",
    detail: "default",
    space: "none",
  };
  return (
    <div className="absolute w-[100vw] font-[600] pb-12 flex items-center justify-center h-[100svh]">
      {/* <NewsletterSignup className="z-10 " /> */}
      <div className="w-[30svw] h-[20svw] border-2 border-white rounded-xl flex flex-col justify-between p-8">
        <urbit-sigil {...config} />
        <h1 className="text-[3rem] leading-[100%] w-full text-center">~hastuc-dibtux</h1>
        <div className="flex flex-row">
          <div className="flex flex-row w-full">
            <div className="flex flex-col">
              <div>&nbsp;star</div>
              <div>&nbsp;galaxy</div>
            </div>
            <div className="flex flex-col ml-4">
              <div>xyz</div>
              <div>xyz</div>
            </div>
          </div>
          <div className="flex flex-col justify-end w-full "> 3.248.095.670 <span className="border-2 border-white flex w-auto">L1</span></div>
        </div>
      </div>
    </div>
  );
};
