import Link from "next/link";

const MetadataLink = ({ title, href, content }) => (
  <div className="flex flex-col basis-1/2 sm:basis-1/4 pr-2 mb-4 min-w-0 flex-1">
    <p className="font-bold text-wall-400">{title}</p>
    <Link href={href}>
      <div className="flex truncate">
        <a className="truncate font-mono text-green-400">{content}</a>
      </div>
    </Link>
  </div>
);

export default MetadataLink;
