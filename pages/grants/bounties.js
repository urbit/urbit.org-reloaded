import { getPostBySlug } from "../../lib/lib";
import GrantProgramOverview from "../../components/GrantProgramOverview";
import { MarkdownParse } from "../../components/Markdown";

export default function Post({ post, markdown, search }) {
  return (
    <GrantProgramOverview
      program="bounties"
      post={post}
      markdown={markdown}
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
  const markdown = JSON.stringify(MarkdownParse({ post }));

  return {
    props: { post, markdown },
  };
}
