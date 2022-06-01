import { getPostBySlug } from "../../lib/lib";
import GrantProgramOverview from "../../components/GrantProgramOverview";

export default function Post({ post, search }) {
  return (
    <GrantProgramOverview
      program="bounties"
      post={post}
      search={search}
      actionText="View Open Bounties"
      actionLink="/grants?program=bounty&open=true&wip=false#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/bounties",
    ["title", "date", "slug", "content"],
    "/"
  );

  return {
    props: { post },
  };
}
