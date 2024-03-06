import React from "react";
import GrantProgramPage from "@/components/GrantProgramPage";
import { Markdown, getPostBySlug } from "@urbit/fdn-design-system";

export default function rfps({ post, markdown }) {
  return (
    <GrantProgramPage
      program="Requests for Proposals"
      post={post}
      markdown={markdown}
      actionText="View RFPs"
      actionLink="/grants?type=RFP#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/rfps",
    ["title", "date", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
