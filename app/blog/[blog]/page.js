import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";
import ThemeManager from "../../components/ThemeManager";

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
      
    </section>
  );
}
