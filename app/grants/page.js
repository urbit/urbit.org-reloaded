import React from "react";
import { getPostsTree, getToml } from "../lib/queries";
import { PostList } from "../components/PostList";

export default async function GrantsHome() {
  const posts = await getPostsTree("grants/");

  const statuses = [
    "Open",
    "In Progress",
    "Completed"
  ]
  const programs = [
    "Proposal", 
    "Bounty"
  ]
  const allPostFrontMatter = [];
  await Promise.all(posts.map(async (post) => {
    const postYaml = await getToml(post.relativePath);
    allPostFrontMatter.push({
      data: postYaml.data,
      relativePath: post.relativePath,
      slug: post.slug 
    });
  }));

  // json.parse

  return (
    <div className="container mb-32 md:mt-[3.06rem]">
      <PostList allPostFrontMatter={allPostFrontMatter} statuses={statuses} programs={programs} />
    </div>
  )
}
