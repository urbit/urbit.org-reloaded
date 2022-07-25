import { Markdown } from "foundation-design-system";
import classnames from "classnames";
import Link from "next/link";
export default function Post({ post }) {
  return ["featured-1", "featured-2", "featured-3"].map((feat) => {
    const childPath =
      post[feat] && post[feat]?.matchedPost?.type === "Application"
        ? `${post[feat]?.matchedPost.ship}/${post[feat].matchedPost.slug}`
        : `${post[feat].matchedPost?.slug}`;
    const href = post[feat]?.matchedPost
      ? `/${post[feat].matchedPost.type.toLowerCase()}s/${childPath}`
      : null;
    return post?.[feat] ? (
      <Link href={href || "#"}>
        <div
          className="mt-8 mb-24 cursor-pointer"
          id={post?.[feat].title.toLowerCase().replace(/ /, "-")}
        >
          <div className="flex space-x-4 items-center">
            <img
              className="rounded-xl w-24 object-cover"
              src={post[feat].image}
            />
            <div className="flex flex-col">
              <h4 className="text-xl pb-1 font-bold">{post?.[feat].title}</h4>
              {badge(post[feat].type)}
            </div>
          </div>
          <div className="markdown mt-8">
            <Markdown.render content={JSON.parse(post[feat].content)} />
          </div>
        </div>
      </Link>
    ) : null;
  });
}

const badge = (type) => {
  return (
    <div
      className={classnames(
        "uppercase font-bold text-white text-xs w-fit rounded-lg mb-2 px-2 py-1",
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
