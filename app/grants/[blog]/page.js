import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";
import classNames from "classnames";

const BLOG_PATH = "app/docs/grants";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    return {
      blog: path.basename(postPath, ".md"), // Strip the .md extension
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const postSlug = `/grants/${params.blog}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug);
  const postMeta = await getYaml(postSlug);
  const config = await getYaml("/config.md");

  const components = postData.components;

  return (
    <section className="grid grid-cols-6 mb-32 mt-32 container">
      <div className="col-span-1"></div>
      <div className="col-span-4">
        <div>
          <div className="flex flex-col text-25px leading-120">
            <span className="">{postData.frontMatter.title}</span>
            <span className="">{postData.frontMatter.subtitle}</span>
          </div>
          <div className="flex flex-col mt-8 text-20px leading-120">
            <span className="">{formatDate(postData.frontMatter.date)}</span>
            <span className="">Reward: {postData.frontMatter.reward} </span>
            <span className="">
              ID: {postData.frontMatter.id} 
            </span>
            <span className="">
              Champions: {formatAuthors(postData.frontMatter.champions)}
            </span>
          </div>
          <button href={postData.frontMatter.application_link} className="my-[2.5rem] text-25px font-[600] bg-white text-black rounded-[5px] leading-[1cap] p-[.5rem]">
            Apply
          </button>
        </div>
        <div className="">
          {Markdoc.renderers.react(postData.content, React, { components })}
        </div>
      </div>
    </section>
  );
}
