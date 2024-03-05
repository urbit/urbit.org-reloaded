import React from "react";
import GrantProgramPage from "@/components/GrantProgramPage";
import { Markdown, getPostBySlug } from "@urbit/fdn-design-system";

export default function Apprenticeships({ post, markdown }) {
  return (
    <GrantProgramPage
      program="apprenticeships"
      post={post}
      markdown={markdown}
      actionText="View Requests"
      actionLink="/grants?type=Apprenticeship&status=open&status=wip&status=completed#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/apprenticeships",
    ["title", "date", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
