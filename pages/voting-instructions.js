import { getPostBySlug } from "../lib/lib";
import BasicPage from "../components/BasicPage";

export default function Post({ post, markdown, search }) {
  return <BasicPage post={post} search={search} />;
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/voting-instructions",
    ["title", "slug", "content"],
    "/"
  );

  return {
    props: { post },
  };
}
