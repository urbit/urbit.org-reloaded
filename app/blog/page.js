import React from "react";
import { getPostsTree, getToml } from "../lib/queries";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "../lib/utils";

export default async function BlogHome() {
  const posts = await getPostsTree("blog/");

  const allPostFrontMatter = [];
  await Promise.all(
    posts.map(async (post) => {
      const frontmatter = await getToml(post.relativePath);
      allPostFrontMatter.push({
        data: frontmatter.data,
        relativePath: post.relativePath,
        slug: post.slug,
      });
    })
  );

  allPostFrontMatter.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return (
    <div className="container mb-32 mt-9  text-xlarge leading-[100%]">
      <section className="md:grid grid-cols-6 gap-x-4 w-full">
        <div className="col-span-1"></div>
        <div className="col-span-4 leading-[120%] font-[400]">
          Stories from the broader Urbit community, the Urbit Foundation, and
          the many people contributing to Urbit.
        </div>
      </section>
      {allPostFrontMatter.map((post) => {
        const { title, date, description, aliases, extra } = post.data;

        return (
          <Link
            href={"/blog/" + post.slug}
            key={post.slug}
            className="block md:grid group  grid-cols-6 gap-x-4 w-full my-16 "
          >
            <div className="col-span-1 hidden md:flex flex-col mb-4 transition-all font-mono !text-large tracking-[.01em] text-gray-f5">
              <div className="mb-[.1em] ">{extra.author}</div>
              <div>{extra.ship}</div>
            </div>
            <div className="col-span-4 group-hover:!text-gray-87 transition-all  flex flex-col leading-[120%]">
              <div className="font-bold">{title}</div>
              <div className="mb-4 md:mb-0">{description}</div>
              
              <div className="flex md:hidden flex-col justify-between">
                <div className="">{extra.author}</div>
                <div>{extra.ship}</div>
              </div>
              <div className="text-gray-87 mb-8">{formatDate(date)}</div>
              {extra.image && (
                <div className="min-h-[300px] xl:h-[300px] xl:w-auto w-full relative mb-2 md:mb-0 ">
                  <img className="w-full h-auto xl:w-auto xl:h-full" loading="lazy" src={extra.image} alt={title} />
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
