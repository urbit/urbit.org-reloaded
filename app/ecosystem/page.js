import React from "react";
import { getPostsTree, getYaml, getToml } from "../lib/queries";
import Link from "next/link";
import classNames from "classnames";
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
    <div className="mb-32 mt-9">
      {/* <div className="container md:grid grid-cols-6 gap-x-4 w-full mb-16 text-xlarge leading-[130%]">
        <p className="col-span-4 col-start-2">
          Urbit’s decentralized ecosystem is growing more than ever, check out
          the Apps, Podcasts, Talks, Companies and more below.
        </p>
      </div> */}

      {/* <section className="md:container w-full md:mb-[4.375rem]">
        <div className="md:hidden">
          <ScrollSection title="Apps" className="md:hidden">
            {allAppsFrontMatter.map((app, i) => {
              return (
                <Link
                  href={app.data.website ? app.data.website : ""}
                  target="_blank"
                  className="card flex flex-col w-[14rem] md:w-[28rem] mb-auto bg-white rounded-[20px] overflow-hidden"
                  key={i}
                >
                  <div className="aspect-square">
                    <img
                      src={app.data.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-d9 flex-grow md:max-h-[9.125rem] h-auto md:min-h-[9.125rem] px-[1rem] md:px-[1.875rem] py-[1.375rem] leading-[110%] font-[500] text-black text-xlarge">
                    <h1 className="mt-[-0.15em]">{app.data.title}</h1>
                    <h3 className="text-gray-87 text-ellipsis line-clamp-3 hidden md:flex">
                      {app.data.description}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </ScrollSection>
        </div>
        <h1 className="hidden md:block mb-[2.25rem]">Apps</h1>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 grid-rows-3 w-full gap-[.625rem]">
          {allAppsFrontMatter.map((app, i) => {
            return (
              <Link
                href={app.data.website ? app.data.website : ""}
                target="_blank"
                className="card flex flex-col  mb-auto bg-white rounded-[20px] overflow-hidden"
                key={i}
              >
                <div className="aspect-square">
                  <img
                    src={app.data.image}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-d9 flex-grow leading-[110%] font-[500] text-black h-[9.125rem] p-[1.375rem] text-xlarge">
                  <h1 className="mt-[-0.15em]">{app.data.title}</h1>
                  <h3 className="text-gray-87">
                    <p className="text-ellipsis line-clamp-3">
                      {app.data.description}
                    </p>
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <ScrollSection title="Podcasts">
        {allPodcastsFrontMatter.map((podcast, i) => {
          return (
            <Link
              href={podcast.data.links[0].url}
              target="_blank"
              className="card flex flex-col w-[14rem] md:w-[28rem]  mb-auto bg-white rounded-[20px] overflow-hidden"
              key={i}
            >
              <div className="aspect-square">
                <img
                  src={podcast.data.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-d9 flex-grow max-h-[9.125rem] h-auto md:min-h-[9.125rem] px-[1rem] md:px-[1.875rem] py-[1.375rem]  leading-[110%] font-[500] text-black text-xlarge">
                <h1 className="mt-[-0.15em]">{podcast.data.title}</h1>
                <h3 className="text-gray-87 text-ellipsis line-clamp-3 hidden">
                  {podcast.data.description}
                </h3>
              </div>
            </Link>
          );
        })}
      </ScrollSection>

      <ScrollSection title="Talks">
        {allTalksFrontMatter.map((talk, i) => {
          return (
            <Link
              href={talk.data.url}
              target="_blank"
              className="card flex flex-col w-[14rem] md:w-[28rem] mb-auto bg-white rounded-[20px] overflow-hidden"
              key={i}
            >
              <div className="aspect-[1.77]">
                <img
                  src={talk.data.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-d9 flex-grow leading-[110%] font-[500] text-black p-[1.375rem] text-xlarge">
                <h1 className="line-clamp-1 text-ellipsis">
                  {talk.data.title}
                </h1>
              </div>
            </Link>
          );
        })}
      </ScrollSection> */}

      <Section className="container" title="Companies">
        {allOrgsFrontMatter.map((org, i) => {
          return (
            <Link
              href={org.data.URL}
              target="_blank"
              key={i}
              className="relative"
            >
              <div className="ml-8 md:ml-0 relative">
                <img
                  src={org.data.image}
                  className="w-12 grayscale opacity-[.5] invert absolute bottom-[-.5em] left-[-2.1em]  "
                />
                <h1 className="text-xlarge leading-[110%]">{org.data.title}</h1>
              </div>
            </Link>
          );
        })}
      </Section>

      <Section title="Articles & Press">
        {allArticlesFrontMatter.map((article, i) => {
          return (
            <Link href={article.data.URL} key={i} target="_blank" className="hover:text-gray-87 text-xlarge leading-[110%] cursor-pointer mb-[1em] flex flex-col">
              <h3 className="text-sm text-gray-87">{article.data.publication}</h3>
              <h1 className="font-[900]">{article.data.title}</h1>
              <h3 className="text-gray-87 font-extrabold">Author: {article.data.author}</h3>
              <h3 className="text-gray-87">Date: {article.data.date}</h3>
            </Link>
          );
        })}
      </Section>
    </div>
  );
}

export const Section = ({ title, children }) => {
  return (
    <section className="container md:grid grid-cols-6 w-full h-max [&:not(:first-of-type)]:pt-4 mb-12 gap-x-4">
      <div className="col-span-1 mb-4 ">
        <h1 className="">{title}</h1>
      </div>
      <div className="col-span-5">{children}</div>
    </section>
  );
};

export const ScrollSection = ({ children, title }) => {
  return (
    <section className="!pr-0 mb-12 md:mb-[4.375rem] overflow-x-auto ">
      <h1 className="container mb-[2.25rem]">{title}</h1>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex flex-row overflow-x-auto w-fit gap-[.3175rem] md:gap-[.625rem] ml-[calc(var(--gutter-size))] 3xl:ml-[calc(((100vw-1900px)/2)+2rem)]">
          {children}
        </div>
      </div>
    </section>
  );
};
