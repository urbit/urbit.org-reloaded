import Link from "next/link";

const MetadataLink = ({ title, href, content }) => (
  <div className="flex flex-col basis-1/2 md:basis-auto">
    <p className="font-bold text-wall-400">{title}</p>
    <Link href={href}>
      <a className="type-ui font-mono text-green-400">{content}</a>
    </Link>
  </div>
);

export default MetadataLink;
