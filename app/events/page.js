import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";
// import { PostList } from "../components/PostList";

export default async function EventsHome() {
  const paths = {
    events: { path: "events/", frontMatter: [] },
    communities: { path: "communities/", frontMatter: [] },
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

  const allCommunitiesFrontMatter = paths.communities.frontMatter;
  const allEventsFrontMatter = paths.events.frontMatter;
  
  return <div className="container mb-32 md:mt-[3.06rem]">
    <section>
      <h1 className="underline text-[3rem] my-8">Events</h1>
      {allEventsFrontMatter.map((event, i) => {
        return (
          <div key={i}>
            <h1>{event.data.title}</h1>
          </div>
        );
      })}
    </section>
    <section>
      <h1 className="underline text-[3rem] my-8">Meetups</h1>
      {allCommunitiesFrontMatter.map((event, i) => {
        return (
          <div key={i}>
            <h1>{event.data.title}</h1>
          </div>
        );
      })}
    </section>
  </div>;
}
