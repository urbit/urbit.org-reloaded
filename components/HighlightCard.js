import Link from "next/link";
export default function HighlightCard({ slug, highlight }) {
  return (
    <Link href={highlight.url}>
      <div className="cursor-pointer bg-wall-100 rounded-xl min-h-0 flex-1">
        <div className="flex flex-col p-4 h-full relative">
          {highlight.image ? (
            <div className="w-64 md:w-full rounded-xl object-cover overflow-hidden basis-3/5">
              <img className="h-full w-64 md:w-full object-cover" src={highlight.image} />
            </div>
          ) : (
            <div className="rounded-xl w-full"/>
          )}
          <div className="pt-4">
            <p className="mb-2 font-semibold leading-5">{highlight.title}</p>
            <p className="text-sm leading-5">{highlight?.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
