import { getPostBySlug } from "../../lib/lib";
import GrantProgramOverview from "../../components/GrantProgramOverview";

export default function Post({ post, search }) {
  return (
    <GrantProgramOverview
      program="proposals"
      post={post}
      search={search}
      actionText="View Proposals"
      actionLink="/grants?program=proposal#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/proposals",
    ["title", "date", "slug", "content"],
    "/"
  );

  return {
    props: { post, markdown },
  };
}
