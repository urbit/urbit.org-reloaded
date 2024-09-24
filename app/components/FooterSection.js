export const FooterSection = ({ footerData }) => {
  // console.log(footerData);
  return (
    <section className=" h-footer-height mb-8 text-20px pl-[3rem] text-gray-87 leading-120">
      <div className="grid md:grid-cols-6">
        {footerData?.map((footerItem, i) => {
          return (
            <div key={i} className="font-[600] mt-4">
              <h2 className=" ">{footerItem.label}</h2>
              <div className="flex flex-col">
                {footerItem.subItems.map((link, i) => {
                  return (
                    <a
                      className="w-max"
                      href={link.url}
                      target={link.external ? "_blank" : "_self"}
                    >
                      {link.title}
                    </a>
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
