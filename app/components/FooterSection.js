import Link from "next/link";
import { NewsletterSignup } from "./NewsletterSignup";
import React from "react";
import classNames from "classnames";
export const FooterSection = ({ footerData }) => {
  return (
    <section className="z-10 h-max mb-8 text-large container text-gray-87 leading-120">
      <NewsletterSignup className="z-10 " />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-4">
        {footerData?.map((footerItem, i) => {
          return (
            <div key={i} className="font-[600] col-span-1">
              <h2 className="text-white">{footerItem.column_label}</h2>
              <div className="flex flex-col">
                {footerItem.subItems.map((link, i) => {
                  return (
                    <React.Fragment key={link.title}>
                      {link.heading ? (
                        <div>
                          <h3 className="text-white">{link.title}</h3>
                        </div>
                      ) : (
                        <Link
                          className={classNames(
                            link.label && "",
                            "w-max flex flex-row relative ")}
                          href={link.url} 
                          target={link.external ? "_blank" : "_self"}
                        >
                          {/* {link.external && (<span>↗</span>)} */}
                          {link.label && 
                          <div className="w-[8.5ch] hidden md:block">
                            <h1 className="">{link.label}</h1>
                            <img
                              src={link.logo}
                              className="w-[.72em] grayscale opacity-[1] invert absolute bottom-[.24em] left-[-1.3em]  "
                            />
                          </div>
                            }
                          <h1>{link.title}
                            <img
                              src={link.logo}
                              className="md:hidden w-[.72em] grayscale opacity-[1] invert absolute bottom-[.24em] left-[-1.2em]  "
                            />
                          </h1>
                  
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
