import React from "react";
import { Markdown, getPostBySlug } from "@urbit/fdn-design-system";
import GrantProgramPage from "@/components/GrantProgramPage";

export default function Bounties({ post, markdown }) {
  return (
    <GrantProgramPage
      program="bounties"
      post={post}
      markdown={markdown}
      links={[
        {
          label: "View Open Bounties",
          url: "/grants?type=Bounty&status=open#view-grants",
        },
        {
          label: "Apply for a Bounty",
          url: "https://airtable.com/apppnWSqfsVvUwkWh/shrCi54rEDxgSZr3z",
        },
        {
          label: "Submit an Invoice",
          url: "https://airtable.com/shrXXCs1uaxtNSBcg",
        },
      ]}
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/bounties",
    ["title", "date", "slug", "content"],
    "/",
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
