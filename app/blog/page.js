import React from "react";
import { getPostsTree, getToml } from "../lib/queries";

export default async function BlogHome() {
  const posts = await getPostsTree("blog/");

  const allPostFrontMatter = [];
  await Promise.all(posts.map(async (post) => {
    const frontmatter = await getToml(post.relativePath);
    allPostFrontMatter.push({
      data: frontmatter.data,
      relativePath: post.relativePath,
      slug: post.slug
    });
  }));

  return (
    <div className="container mb-32 md:mt-[3.06rem]">
      <h1 className="text-[3rem] underline leading-[120%]">Blog</h1>
      {allPostFrontMatter.map((post) => {
        return (
          <div key={post.slug}>
            <h2>{post.data.title}</h2>
            {/* <p>{post.data.description}</p> */}
          </div>
        )
      })}
    </div>
  )
}
