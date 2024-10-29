import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";
import classNames from "classnames";
import ThemeManager from "../../components/ThemeManager";
import Link from "next/link";

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
  const postData = await getMarkdownContent(postSlug, "toml");
  const postMeta = await getYaml(postSlug);
  const config = await getYaml("/config.md");

  const components = postData.components;

  return (
    <section className="grid md:grid-cols-6 mb-32 mt-[4rem] md:mt-[6rem] container">
      <ThemeManager />

      <div className="col-span-1"></div>
      <div className="col-span-4 tracking-[.01em]">
        <div>
          <div className="flex flex-col text-[2.8rem] md:text-25px leading-120">
            <span className="font-[700]">{postData.frontMatter.title}</span>
            <span className="">{postData.frontMatter.subtitle}</span>
          </div>
          <div className="flex flex-col mt-8 text-25px md:text-21px leading-120">
            <span className="">{formatDate(postData.frontMatter.date)}</span>
            <span className="">Reward: {postData.frontMatter.reward} </span>
            <span className="">ID: {postData.frontMatter.id}</span>
            <span className="">
              Champion(s): {formatAuthors(postData.frontMatter.champions)}
            </span>
          </div>
          <div
            className="my-[2.8rem]"
          >
            {/* <Link className="apply-button" href={postData.frontMatter?.application_link}>
              Apply
            </Link> */}
          </div>
        </div>
        <div className="">
          {Markdoc.renderers.react(postData.content, React, { components })}
        </div>
      </div>
    </section>
  );
}
