import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";

const BLOG_PATH = "app/content/blog";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      blog: JSON.parse(JSON.stringify(p)),
      // Strip the .md extension
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const postSlug = `/blog/${params.blog}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug, "toml");
  const { title, date, extra, taxonomies } = postData.frontMatter;

  return (
    <section className="grid md:grid-cols-6 mb-32 mt-[4rem] md:mt-[6rem] container">
      <div className="col-start-2 col-span-4 leading-[120%]">
        <h1 className="text-3xlarge leading-[120%]">{postData.frontMatter.title}</h1>
        <h3 className="text-xlarge leading-[120%] mb-4">{postData.frontMatter.description}</h3>
        <h3 className="text-base mb-4">{postData.frontMatter.date}</h3>
        <div className="col-span-1 flex flex-col leading-[120%] mb-4 font-mono text-large tracking-[.01em] text-gray-f5">
          <div className="mb-[.1em]">{extra.author}</div>
          <div>{extra.ship}</div>
        </div>
        {Markdoc.renderers.react(postData.content, React)}
      </div>
    </section>
  );
}
