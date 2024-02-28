import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import {
  Container,
  Main,
  Section,
  FatBlock,
  Markdown,
  getPostBySlug,
  getAllPosts,
  getNextPosts,
  getPreviousPosts,
  formatDate,
  generateDisplayDate,
} from "@urbit/fdn-design-system";
import ErrorPage from "@/pages/404";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import PostCard from "@/components/PostCard";

function footnotePosts(nextPosts, previousPosts) {
  if (!nextPosts) return previousPosts;
  if (!previousPosts) return nextPosts;

  const prev = previousPosts.slice(0, 2);
  const next = [...nextPosts]
    .reverse()
    .slice(0, 3 - prev.length)
    .reverse();

  return [...next, ...prev];
}

export default function Post({ post, markdown, nextPosts, previousPosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const date = formatDate(generateDisplayDate(post.date));

  const showcasedPosts = footnotePosts(nextPosts, previousPosts);

  return (
    <Container>
      <Head>
        <title>{post.title} • Blog • urbit.org</title>
        {Meta(post, false, true)}
      </Head>
      <IntraNav />
      <Main responsiveSpace singleColumn>
        <Section className="text-primary mt-12 md:mt-16">
          <div>
            <h1 className="h1 mb-8 md:mb-16 lg:mb-20">{post.title}</h1>
            <p className="h1">{post.description} </p>
          </div>
        </Section>
        <Section className="text-primary" divider={"border-primary"}>
          <div className="flex justify-between body-sm font-semibold">
            <p>{date}</p>
            <div>
              <p>{post.extra.author}</p>
              {post.extra.ship && (
                <p className="relative">
                  <span className="absolute -left-3">~</span>
                  {post.extra?.ship.replace(/^~/, "")}
                </p>
              )}
            </div>
          </div>
          <div className="markdown layout-narrow">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
        </Section>
        <Section divider>
          <FatBlock className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
            {showcasedPosts &&
              showcasedPosts.map((p) => (
                <PostCard
                  href={path.join("/blog", p.slug)}
                  target="_self"
                  {...p}
                />
              ))}
          </FatBlock>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const nextPosts =
    getNextPosts(
      params.slug,
      ["title", "description", "date", "extra", "slug"],
      "blog"
    ) || null;

  const previousPosts =
    getPreviousPosts(
      params.slug,
      ["title", "description", "date", "extra", "slug"],
      "blog"
    ) || null;

  const post =
    getPostBySlug(
      params.slug,
      ["title", "description", "date", "extra", "slug", "content"],
      "blog"
    ) || null;

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, nextPosts, previousPosts },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "blog", "date");

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
