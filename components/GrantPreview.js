import classnames from "classnames";
import Link from "next/link";

export default function GrantPreview({ post }) {
  console.log(post);
  return (
    <div key={post.slug} className="mb-4 cursor-pointer bg-wall rounded-lg">
      <Link href={`/grants/${post.slug}`}>
        <div className="p-8">
          <h3 className="type-ui mb-4">{post.title}</h3>
          <p className="mb-4">{post.extra.description}</p>
          <div className="flex w-full flex-col md:flex-row md:items-center justify-between">
            <p className="text-gray">
              <strong>Reward: </strong>
              {post.extra.reward} star
              {post.extra.reward === 1 ? "" : "s"}
            </p>
            <div className="flex items-center flex-wrap md:mt-0 mt-4">
              {post.taxonomies.grant_type.map((category) => {
                const className = classnames({
                  "bg-blue text-white": category === "Proposal",
                  "bg-green text-white": category === "Apprenticeship",
                  "bg-yellow": category === "Bounty",
                });
                return (
                  <div className={`${className} badge-sm mr-1 my-1`}>
                    {category}
                  </div>
                );
              })}
              {post.taxonomies.grant_category.map((category) => (
                <div className="bg-gray text-wall badge-sm mr-1 my-1">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
