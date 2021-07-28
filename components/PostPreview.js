import Link from "next/link";
import BackgroundImage from "./BackgroundImage";
import { formatDate } from "../lib/lib";

export default function PostPreview(props) {
  const section = props?.section ? props.section : "blog";
  return (
    <div className={`cursor-pointer ${props.className}`}>
      {props.title ? <h3 className="mb-2">{props.title}</h3> : null}

      <Link
        href={`/${section}/${props.post.slug}`}
        key={`post-${props.post.slug}`}
      >
        <div>
          <BackgroundImage
            className="w-full h-96 rounded-lg"
            src={props.post.extra.image || ""}
          />
          <p className="text-black mt-2">{props.post.title}</p>
          <p className="text-gray">{formatDate(new Date(props.post.date))}</p>
        </div>
      </Link>
    </div>
  );
}

PostPreview.defaultProps = {
  className: "",
};
