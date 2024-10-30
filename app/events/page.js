import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";
// import { PostList } from "../components/PostList";

export default async function EventsHome() {
  const paths = {
    events: { path: "events/meetups", frontMatter: [] },
    meetups: { path: "ecosystem/articles", frontMatter: [] },
  };

  // Load posts tree for each path
  await Promise.all(
    Object.keys(paths).map(async (key) => {
      const tree = await getPostsTree(paths[key].path);

      await Promise.all(
        tree.map(async (post) => {
          const frontMatter = await getToml(post.relativePath);
          paths[key].frontMatter.push({
            data: frontMatter.data,
            relativePath: post.relativePath,
            slug: post.slug,
          });
        })
      );
    })
  );

  return <div className="container mb-32 md:mt-[3.06rem]"></div>;
}
