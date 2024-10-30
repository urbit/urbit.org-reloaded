import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";
import ThemeManager from "../../components/ThemeManager";

const BLOG_PATH = "app/docs/grants";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      grant: JSON.parse(JSON.stringify(p)),
      // Strip the .md extension
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const postSlug = `/grants/${params.grant}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug, "toml");
  const { title, date, extra, taxonomies } = postData.frontMatter;
  const postMeta = await getYaml(postSlug);
  const config = await getYaml("/config.md");

  // const components = postData?.components;

  return (
    <section className="grid md:grid-cols-6 mb-32 mt-[4rem] md:mt-[6rem] container">
      <ThemeManager />

      <div className="col-span-1"></div>
      <div className="col-span-4 tracking-[.01em]">
        <div>
          <div className="flex flex-col text-[2.8rem] md:text-25px leading-120">
            <span className="font-[700]">{title}</span>
            <span className="">{extra?.description}</span>
          </div>
          <div className="flex flex-col mt-8 text-25px md:text-21px leading-120">
            <span className="">{formatDate(date)}</span>
            <span className="">Reward: {extra.reward} </span>
            <span className="">ID: {extra?.grant_id}</span>
            <span className="">Champion(s): {extra?.champion}</span>
          </div>
          <div className="my-[2.8rem]">
            {/* <Link className="apply-button" href={postData.frontMatter?.application_link}>
              Apply
            </Link> */}
          </div>
        </div>
        <div className="">
          {Markdoc.renderers.react(postData.content, React)}
        </div>
      </div>
    </section>
  );
}
