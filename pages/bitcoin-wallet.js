import { getPostBySlug } from "../lib/lib";
import BasicPage from "../components/BasicPage";

export default function Post({ post, search }) {
  return <BasicPage post={post} search={search} />;
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/Bitcoin-wallet",
    ["title", "slug", "content"],
    "/"
  );

  return {
    props: { post },
  };
}
