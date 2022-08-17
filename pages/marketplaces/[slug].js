import { getAllPosts, getPostBySlug, getPostSlugs } from "../../lib/lib";
import BasicPage from "../../components/ecosystem/BasicPage";
import { Markdown } from "@urbit/foundation-design-system";
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
      section="Urbit Marketplace"
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
    ["title", "slug", "URL", "image", "payment", "content"],
    "marketplaces"
  );

  const spotlights = getAllPosts(
    ["title", "slug", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight"
  ).filter(
    (e) =>
      e?.["featured-1"]?.title === post.title ||
      e?.["featured-2"]?.title === post.title ||
      e?.["featured-3"]?.title === post.title
  );

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
