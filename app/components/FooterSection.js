import Link from "next/link";
import {NewsletterSignup} from "./NewsletterSignup";

export const FooterSection = ({ footerData }) => {
  return (
    <section className="z-10 h-max mb-8 text-20px  container text-gray-87 leading-120">
                <NewsletterSignup className="z-10 " />

      <div className="grid grid-cols-2 md:grid-cols-6">
        {footerData?.map((footerItem, i) => {
          return (
            <div key={i} className="font-[600] mt-4">
              <h2 className=" ">{footerItem.label}</h2>
              <div className="flex flex-col">
                {footerItem.subItems.map((link, i) => {
                  return (
                    <Link
                      className="w-max"
                      href={link.url}
                      target={link.external ? "_blank" : "_self"}
                    >
                      {link.title}
                      {/* {link.external && (<span>↗</span>)} */}
                    </Link>
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
