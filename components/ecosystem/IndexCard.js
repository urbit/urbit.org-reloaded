import Link from "next/link";
import classnames from "classnames";
export default function IndexCard({ slug, feat }) {
  return (
    <Link href={slug}>
      <div className="cursor-pointer bg-wall-100 rounded-xl min-h-0 flex-1">
        <div className="flex flex-col p-4 h-full relative">
          {feat.image ? (
            <div
              className="w-64 md:w-full rounded-xl object-cover overflow-hidden basis-1/2"
              style={{
                backgroundColor: feat?.matchedPost?.bgColor || "rgba(0,0,0,0)",
              }}
            >
              <img className="h-full w-64 md:w-full object-cover" src={feat.image} />
            </div>
          ) : (
            <div
              className="rounded-xl w-full"
              style={{
                backgroundColor: feat?.matchedPost?.bgColor || "rgba(0,0,0,0)",
              }}
            />
          )}
          <div className="pt-4">
            <p className="mb-2 font-semibold leading-5">{feat.title}</p>
            {badge(feat.type)}
            <p className="text-sm leading-5">{feat?.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

const badge = (type) => {
  return (
    <div
      className={classnames(
        "uppercase font-bold text-white text-xs w-fit rounded-lg mb-5 px-2 py-1",
        {
          "bg-[#B37ED7]": type === "Organization",
          "bg-[#83b2d4]": type === "Application",
          "bg-wall-600": type === "Podcast",
          "bg-[#8dd5b1]": type === "Marketplace",
          "bg-[#000000]": type === "Article",
        }
      )}
    >
      {type}
    </div>
  );
};
