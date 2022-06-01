import { getPostBySlug } from "../lib/lib";
import PageWithIndex from "../components/PageWithIndex";

export default function Post({ post, search }) {
  return <PageWithIndex post={post} search={search} />;
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/terms-of-use",
    ["title", "slug", "content"],
    "/"
  );

  return {
    props: { post },
  };
}
