import { getPostBySlug } from "../../lib/lib";
import GrantProgramOverview from "../../components/GrantProgramOverview";

export default function Post({ post, search }) {
  return (
    <GrantProgramOverview
      program="apprenticeships"
      post={post}
      search={search}
      actionText="View Apprenticeships"
      actionLink="/grants?program=apprenticeship&completed=true#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/apprenticeships",
    ["title", "date", "slug", "content"],
    "/"
  );

  return {
    props: { post },
  };
}
