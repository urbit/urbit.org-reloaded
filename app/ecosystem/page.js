import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";

export default async function EcosystemHome() {
  const paths = {
    apps: { path: "ecosystem/apps", frontMatter: [] },
    articles: { path: "ecosystem/articles", frontMatter: [] },
    orgs: { path: "ecosystem/orgs", frontMatter: [] },
    podcasts: { path: "ecosystem/podcasts", frontMatter: [] },
    talks: { path: "ecosystem/talks", frontMatter: [] },
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

  const allAppsFrontMatter = paths.apps.frontMatter;
  const allArticlesFrontMatter = paths.articles.frontMatter;
  const allOrgsFrontMatter = paths.orgs.frontMatter;
  const allPodcastsFrontMatter = paths.podcasts.frontMatter;
  const allTalksFrontMatter = paths.talks.frontMatter;

  return (
    <div className="container mb-32 md:mt-[3.06rem]">
      <section>
        <h1 className="underline text-[3rem] my-8">Apps</h1>
        {allAppsFrontMatter.map((app, i) => {
          return (
            <div key={i}>
              <h1>{app.data.title}</h1>
            </div>
          );
        })}
      </section>
      <section>
        <h1 className="underline text-[3rem] my-8">Articles</h1>
        {allArticlesFrontMatter.map((article, i) => {
          return (
            <div key={i}>
              <h1>{article.data.title}</h1>
            </div>
          );
        })}
      </section>
      <section>
        <h1 className="underline text-[3rem] my-8">Orgs</h1>
        {allOrgsFrontMatter.map((org, i) => {
          return (
            <div key={i}>
              <h1>{org.data.title}</h1>
            </div>
          );
        })}
      </section>
      <section>
        <h1 className="underline text-[3rem] my-8">Podcasts</h1>
        {allPodcastsFrontMatter.map((podcast, i) => {
          return (
            <div key={i}>
              <h1>{podcast.data.title}</h1>
            </div>
          );
        })}
      </section>
      <section>
        <h1 className="underline text-[3rem] my-8">Talks</h1>
        {allTalksFrontMatter.map((talk, i) => {
          return (
            <div key={i}>
              <h1>{talk.data.title}</h1>
            </div>
          );
        })}
      </section>
    </div>
  );
}
