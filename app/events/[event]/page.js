import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";

const BASE_PATH = "app/content/events";
const POSTS_DIR = path.join(process.cwd(), BASE_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      event: JSON.parse(JSON.stringify(p)),
      // Strip the .md extension
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const eventSlug = `/events/${params.event}.md`; // Append .md here to use in the file path
  const eventData = await getMarkdownContent(eventSlug, "toml");
  const { title, description, registration_url, location } = eventData.frontMatter;

  return (
    <section className="grid md:grid-cols-6 mb-32 mt-[4rem] md:mt-[6rem] container">
      
      <div className="col-start-2 col-span-4 text-xlarge leading-[120%]">
        <div className="flex flex-col mb-8">
          <div>{title}</div>
          <div>{description}</div>
          <div>{location}</div>
          <div>{registration_url}</div>
        </div>
        {Markdoc.renderers.react(eventData.content, React)}
      </div>
    </section>
  );
}
