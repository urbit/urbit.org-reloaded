import React from "react";
import { getPostsTree, getYaml } from "../lib/queries";
import { PostList } from "../components/PostList";

export default async function BlogHome() {
  const posts = await getPostsTree("grants/");
  const config = await getYaml("/config.md");
  // const categories = config.data.blog_metadata.categories;

  const statuses = [
    "Open",
    "In Progress",
    "Completed"
  ]
  const programs = [
    "Proposal", 
    "Bounty"
  ]
  const allPostsYaml = [];
  await Promise.all(posts.map(async (post) => {
    const postYaml = await getYaml(post.relativePath);
    allPostsYaml.push({
      data: postYaml.data,
      relativePath: post.relativePath,
      slug: post.slug 
    });
  }));

  return (
    <div className="mb-8 mx-[3rem]">
      <PostList allPostsYaml={allPostsYaml} statuses={statuses} programs={programs} />
    </div>
  )
}
