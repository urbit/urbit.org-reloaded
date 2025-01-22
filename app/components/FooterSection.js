import Link from "next/link";
import { NewsletterSignup } from "./NewsletterSignup";
import React from "react";
export const FooterSection = ({ footerData }) => {
  return (
    <section className="z-10 h-max mb-8 text-large container text-gray-87 leading-120">
      <NewsletterSignup className="z-10 " />

      <div className="grid md:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-4">
        {footerData?.map((footerItem, i) => {
          return (
            <div key={i} className="font-[600]">
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
                          className="w-max"
                          href={link.url}
                          target={link.external ? "_blank" : "_self"}
                        >
                          {link.title}
                          {/* {link.external && (<span>↗</span>)} */}
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
