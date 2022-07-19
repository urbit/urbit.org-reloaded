import { getAllPosts, getPostBySlug, getPostSlugs } from "../../lib/lib";
import BasicPage from "../../components/ecosystem/BasicPage";
import { Markdown } from "foundation-design-system";
import Link from "next/link";

export default function Marketplace({
  post,
  markdown,
  search,
  index,
  spotlights = [],
}) {
  return (
    <BasicPage
      section="Marketplaces"
      post={post}
      markdown={markdown}
      search={search}
      index={index}
    >
      {spotlights.length > 0 && (
        <p>
          Featured in{" "}
          {spotlights.map((e, i) => (
            <>
              {i ? ", " : ""}
              <Link href={`/ecosystem/spotlight/${e.slug}`}>{e.title}</Link>
            </>
          ))}
        </p>
      )}
    </BasicPage>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "URL", "image", "content"],
    "marketplaces"
  );

  const spotlights = getAllPosts(
    ["title", "slug", "featured"],
    "ecosystem/spotlight"
  ).filter((e) => e.featured.includes(post.title));

  let { index } = post?.extra || { index: null };

  if (index === undefined) {
    index = null;
  }

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, spotlights, index },
  };
}

export async function getStaticPaths() {
  const posts = getPostSlugs("marketplaces");

  const slugs = posts.map((e) => e.slice(0, -3));

  return {
    paths: slugs.map((post) => {
      return {
        params: {
          slug: post,
        },
      };
    }),
    fallback: false,
  };
}
