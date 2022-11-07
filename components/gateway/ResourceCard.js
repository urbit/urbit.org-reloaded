import Link from "next/link";
import GatewayImage from "./Image";
import classNames from "classnames";
import { capitalize } from "@urbit/foundation-design-system";

const ResourceCard = ({ type, shortcode, title, description = "", color, image, full }) => (
  <Link href={`/${type}s/${shortcode}`}>
    <div className={classNames("cursor-pointer rounded-xl bg-wall-100 p-4 flex items-center space-x-4 mr-2 my-1", {
      "basis-full": full
    })}>
      <GatewayImage color={color} image={image || color} size={50} />
      {full
        ? <><div className="flex flex-col w-full">
          <a className="font-semibold">{title}</a>
          <p className="hidden lg:block">{description}</p>
        </div>
          <a className="button-lg bg-green-400 text-white shrink-0">View {capitalize(type)}</a>
        </>
        : <a className="font-semibold">{title}</a>}
    </div>
  </Link>
);

export default ResourceCard;
