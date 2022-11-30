import Link from "next/link";
import EcosystemBadge from "./Badge";
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
            <EcosystemBadge type={feat.type} />
            <p className="text-sm leading-5">{feat?.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
