import React from "react";
import { Markdown, getPostBySlug } from "@urbit/fdn-design-system";
import GrantProgramPage from "@/components/GrantProgramPage";

export default function Proposals({ post, markdown }) {
  return (
    <GrantProgramPage
      program="proposals"
      post={post}
      markdown={markdown}
      links={[
        {
          label: "View Completed Proposals",
          url: "/grants?type=Proposal&status=completed#view-grants",
        },
        {
          label: "Submit a Proposal",
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
    "/proposals",
    ["title", "date", "slug", "content"],
    "/",
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
