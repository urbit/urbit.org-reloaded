import Link from "next/link";
import GatewayImage from "./gateway/Image";

const ResourceCard = ({ type, shortcode, title, image }) => (
  <Link href={`/${type}s/${shortcode}`}>
    <div className="cursor-pointer rounded-xl bg-wall-100 p-4 flex items-center space-x-4">
      <GatewayImage image={image} size={50} />
      <a className="font-semibold">{title}</a>
    </div>
  </Link>
);

export default ResourceCard;
