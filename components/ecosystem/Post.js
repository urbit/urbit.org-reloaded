import { Markdown } from "@urbit/foundation-design-system";
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
      <div
        className="mt-8 mb-24"
        id={post?.[feat].title.toLowerCase().replace(/ /, "-")}
      >
        <div className="flex space-x-4 items-center">
          <div
            className="h-24 w-24 rounded-xl items-center justify-center shrink-0 overflow-hidden"
            style={{
              backgroundColor:
                post[feat]?.matchedPost?.bgColor || "rgba(0,0,0,0)",
            }}
          >
            {post[feat]?.matchedPost?.image && (
              <img
                className="rounded-xl w-24 object-cover"
                src={post[feat].image}
              />
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl pb-2 leading-6 font-bold">
              {post?.[feat].title}
            </h4>
            {badge(post[feat].type)}
          </div>
        </div>
        <div className="markdown mt-8 mb-8">
          <Markdown.render content={JSON.parse(post[feat].content)} />
        </div>

        {post[feat].type === "Podcast" && (
          <Link href={href || "#"} passHref>
            <a class="button-sm text-white flex-col bg-green-400 cursor-pointer pr-4 w-fit">
              Listen to {post[feat].type}
            </a>
          </Link>
        )}

        {post[feat].type === "Application" && (
          <Link href={href || "#"} passHref>
            <a class="button-sm text-white flex-col bg-green-400 cursor-pointer pr-4 w-fit">
              View {post[feat].type}
            </a>
          </Link>
        )}

        {post[feat].type === "Organization" && (
          <Link href={href || "#"} passHref>
            <a class="button-sm text-white flex-col bg-green-400 cursor-pointer pr-4 w-fit">
              More about {post[feat].title}
            </a>
          </Link>
        )}

        {post[feat].type === "Marketplace" && (
          <Link href={href || "#"} passHref>
            <a class="button-sm text-white flex-col bg-green-400 cursor-pointer pr-4 w-fit">
              More about {post[feat].title}
            </a>
          </Link>
        )}
      </div>
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
          "bg-wall-600": type === "Podcast",
          "bg-[#8dd5b1]": type === "Marketplace",
        }
      )}
    >
      {type}
    </div>
  );
};
