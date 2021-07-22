import Link from "next/link";
import { formatDate } from "../lib/lib";

export default function Pagination(props) {
  return (
    <Link
      href={`/${props.section}/${props.post.slug}`}
      key={`post-${props.post.slug}`}
    >
      <div className="bg-wall cursor-pointer font-semibold p-2 px-4 rounded-xl">
        <p className="text-black">
          {props.previous ? "<- " : ""}
          {props.post.title}
          {props.next ? " ->" : ""}
        </p>
      </div>
    </Link>
  );
}

Pagination.defaultProps = {
  className: "",
};
