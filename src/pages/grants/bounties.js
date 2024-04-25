import React from "react";
import GrantProgramPage from "@/components/GrantProgramPage";
import { Markdown, getPostBySlug } from "@urbit/fdn-design-system";

export default function Bounties({ post, markdown }) {
  return (
    <GrantProgramPage
      program="bounties"
      post={post}
      markdown={markdown}
      actionText="View Open Bounties"
      actionLink="/grants?type=Bounty&status=open#view-grants"
      faq={[
        {
          q: "How do I write a proposal?",
          a: (
            <p>
              Proposals should clearly articulate your idea and the value it
              will bring to the Urbit network.
              <br />
              Good proposals all include the following:
              <br />
              <br />
              — A detailed and clear description of the proposal. If you're
              proposing something technical, user stories are a good idea.
              <br />
              — An overview of why you are the right person for the job. A
              description of your background, familiarity with the project, and
              professional/education experience are all good starts.
              <br />
              — Your estimate for date of completion.
              <br />
              — The amount of funding you'd like for the project, denominated in
              stars. What specific deliverables will look like.
              <br />
              <br />
              It’s recommended to break your project into milestones, each of
              which must have its own completion dates, funding amounts and
              deliverables. In general, proposals should target a first
              deliverable within two months of the start of the project.
              Proposals should have a maximum of five milestones as scoping a
              project beyond that is impractical, and each milestone should
              constitute significant enough work to warrant the reward of a full
              star.
            </p>
          ),
        },
        {
          q: "Can I see past proposals as a reference for writing my own?",
          a: "answer to question2.",
        },
        { q: "How much funding should I request?", a: "answer to question3." },
        {
          q: "Is there any timeline I should meet?",
          a: "answer to question4.",
        },
      ]}
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/bounties",
    ["title", "date", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
