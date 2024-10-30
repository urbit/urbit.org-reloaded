import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";
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
  const allPostFrontMatter = [];
  await Promise.all(posts.map(async (post) => {
    const postYaml = await getToml(post.relativePath);
    allPostFrontMatter.push({
      data: postYaml.data,
      relativePath: post.relativePath,
      slug: post.slug 
    });
  }));

  return (
    <div className="container mb-32 md:mt-[3.06rem]">
      <PostList allPostFrontMatter={allPostFrontMatter} statuses={statuses} programs={programs} />
    </div>
  )
}
