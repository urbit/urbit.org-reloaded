import React from "react";
import { getPostsTree, getToml } from "../lib/queries";
import Image from "next/image";
import Link from "next/link";

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
      // console.log(allPostFrontMatter);
    })
  );

  return (
    <div className="container mb-32 md:mt-[3.06rem]  text-xlarge leading-[100%]">
      <section className="md:grid grid-cols-6 gap-x-4 w-full">
        <div className="col-span-1"></div>
        <div className="col-span-4">
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
            className="md:grid group  grid-cols-6 gap-x-4 w-full my-16 "
          >
            <div className="col-span-1 flex flex-col mb-4 transition-all font-mono !text-large tracking-[.01em] text-gray-f5">
              <div className="mb-[.1em] ">{extra.author}</div>
              <div>{extra.ship}</div>
            </div>
            <div className=" col-span-4 group-hover:!text-gray-87 transition-all  flex flex-col leading-[120%]">
              <div className="font-bold">{title}</div>
              <div>{description}</div>
              <div className="text-gray-87  mb-4">{date}</div>
              <div className="h-[300px] w-auto relative">
                <img className="h-full w-auto" loading="lazy" src={extra.image} alt={title} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
