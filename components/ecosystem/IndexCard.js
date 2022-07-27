import Link from "next/link";
import classnames from "classnames";
export default function IndexCard({ slug, feat }) {
  return (
    <Link href={slug}>
      <div className="cursor-pointer bg-wall-100 rounded-xl min-h-0 flex-1">
        <div className="flex flex-col p-4 justify-between items-between h-full relative">
          {feat.image ? (
            <img
              className="rounded-xl w-full flex-1 object-cover"
              src={feat.image}
              style={{ aspectRatio: "4 / 3" }}
            />
          ) : (
            <div
              className="bg-wall-200 rounded-xl w-full flex-1"
              style={{ aspectRatio: "4 / 3" }}
            />
          )}
          <div className="grow-1 shrink-0 flex flex-col h-full min-h-0 pt-4">
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
          "bg-[#333333]": type === "Podcast",
          "bg-[#8dd5b1]": type === "Marketplace",
        }
      )}
    >
      {type}
    </div>
  );
};
