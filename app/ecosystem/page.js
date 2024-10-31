import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";
import Link from "next/link";

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
    <div className="mb-32 md:mt-[3.06rem]">
      <Section title="">
        <p>
          Urbit’s decentralized ecosystem is growing more than ever, check out
          the Apps, Podcasts, Talks, Companies and more below.
        </p>
      </Section>

      <section className="container w-full mb-24">
        <h1 className="mb-4">Apps</h1>
        <div className="grid grid-cols-4 grid-rows-3 w-full gap-4">
          {allAppsFrontMatter.map((app, i) => {
            return (
              <div
                className="flex flex-col h-auto bg-white rounded-[20px] overflow-hidden "
                key={i}
              >
                <div className="aspect-square">
                  <img src={app.data.image} className="w-full object-contain" />
                </div>
                <div className="bg-gray-d9 flex-grow h-auto text-black p-4">
                  <h1>{app.data.title}</h1>
                  <h3 className="text-gray-87">
                    <p className="text-ellipsis">{app.data.description}</p>
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className=" !pr-0 mb-24 overflow-x-auto ">
        <h1 className="container  z-[100] mb-4">Podcasts</h1>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex flex-row overflow-x-auto w-fit gap-4 ml-[20px] md:ml-[3rem] 3xl:ml-[calc(((100vw-1900px)/2)+2.5rem)]">
            {allPodcastsFrontMatter.map((podcast, i) => {
              return (
                <div
                  className="flex flex-col w-[400px] mb-auto bg-white rounded-[20px] overflow-hidden"
                  key={i}
                >
                  <div className="aspect-square">
                    <img
                      src={podcast.data.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-d9 flex-grow h-auto min-h-[6rem] text-black p-4">
                    <h1>{podcast.data.title}</h1>
                    <h3 className="text-gray-87">
                      {/* <p className="text-ellipsis">{app.data.description}</p> */}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className=" !pr-0 mb-24 overflow-x-auto ">
        <h1 className="container z-[100] mb-4">Talks</h1>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex flex-row overflow-x-auto w-fit gap-4 ml-[20px] md:ml-[3rem] 3xl:ml-[calc(((100vw-1900px)/2)+2.5rem)]">
            {allTalksFrontMatter.map((talk, i) => {
              return (
                <div
                  className="flex flex-col w-[400px] mb-auto bg-white rounded-[20px] overflow-hidden"
                  key={i}
                >
                  <div className="aspect-[1.77]">
                    <img
                      src={talk.data.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-d9 flex-grow h-auto min-h-[6rem] text-black p-4">
                    <h1>{talk.data.title}</h1>
                    <h3 className="text-gray-87">
                      {/* <p className="text-ellipsis">{app.data.description}</p> */}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Section className="container" title="Companies">
        {allOrgsFrontMatter.map((org, i) => {
          return (
            <Link
              href={org.data.URL}
              target="_blank"
              key={i}
              className="relative"
            >
              <img
                src={org.data.image}
                className="w-10 grayscale opacity-[.5] invert absolute bottom-[-.3em] left-[-1.8em]  "
              />
              <h1>{org.data.title}</h1>
            </Link>
          );
        })}
      </Section>

      <Section title="Articles & Press">
        {allArticlesFrontMatter.map((article, i) => {
          return (
            <div key={i} className="mb-4">
              <h3 className="text-gray-87">{article.data.publication}</h3>
              <h1>{article.data.title}</h1>
              <h3 className="text-gray-87">Author: {article.data.author}</h3>
              <h3 className="text-gray-87">Date: {article.data.date}</h3>
            </div>
          );
        })}
      </Section>
    </div>
  );
}

export const Section = ({ title, children }) => {
  return (
    <section className="container grid grid-cols-6 w-full h-full mb-12 pt-4 gap-x-4">
      <div className="col-span-1">
        <h1 className="8">{title}</h1>
      </div>
      <div className="col-span-5">{children}</div>
    </section>
  );
};
