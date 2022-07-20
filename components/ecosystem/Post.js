import { Markdown } from "foundation-design-system";
import classnames from "classnames";
import Link from "next/link";
export default function Post({ post }) {
  return ["featured-1", "featured-2", "featured-3"].map((feat) => {
    return post?.[feat] ? (
      <div className="mt-8 mb-24">
        <div className="flex space-x-4 items-center">
          <img
            className="rounded-xl w-24 object-cover"
            src={post[feat].image}
          />
          <div className="flex flex-col">
            <h4 className="text-2xl font-bold">{post?.[feat].title}</h4>
            {badge(post[feat].type)}
            {post[feat].type !== "Application" && (
              <a className="font-bold text-green-400" href={post[feat].URL}>
                {post[feat].URL.slice(post[feat].URL.indexOf("://") + 3)}
              </a>
            )}
            {post[feat].type === "Application" && (
              <Link href={`/applications/${post[feat].URL}`}>
                <a>{post[feat].URL}</a>
              </Link>
            )}
          </div>
        </div>
        <div className="markdown mt-8">
          <Markdown.render content={JSON.parse(post[feat].content)} />
        </div>
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
          "bg-[#8dd5b1]": type === "Podcast",
          "bg-[#8dd5b1]": type === "Marketplace",
        }
      )}
    >
      {type}
    </div>
  );
};
