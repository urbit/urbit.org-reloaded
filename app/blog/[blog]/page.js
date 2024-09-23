import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from 'path';
import classNames from "classnames";


const BLOG_PATH = "app/docs/grants";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'));
  const paths = postPaths?.map(postPath => {
    return { 
      blog: path.basename(postPath, '.md') // Strip the .md extension
    };
  });

  return paths;
}


export default async function PostPage({ params }) {
  const postSlug = `/grants/${params.blog}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug);
  const postMeta = await getYaml(postSlug);
  const config = await getYaml('/config.md');

  const components = postData.components;

  return (
    <section className="container">
      <div>
        <span className="">{postData.frontMatter.title}</span>
        <div className="">
          <span className="">{formatDate(postData.frontMatter.date)}</span>
          <span className="">{formatAuthors(postData.frontMatter.authors)}</span>
        </div>
      </div>
      <div className="">
        {Markdoc.renderers.react(postData.content, React, { components })}
      </div>
    </section>
  );
}
