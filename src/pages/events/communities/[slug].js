import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Main,
  Markdown,
  getPostBySlug,
  getAllPosts,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import ErrorPage from "@/pages/404";

export default function Community({ post, markdown }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Communities • Events • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main responsiveSpace singleColumn>
        <div className="flex text-primary mt-12 md:mt-16">
          <img
            className="object-cover aspect-square rounded-md w-1/3"
            src={post.image}
          />
          <div className="flex flex-col justify-between w-2/3 pl-5 md:pl-8 lg:pl-16">
            <h1 className="h1">{post.title}</h1>
            <div className="flex flex-row flex-wrap xs:flex-col body-md gap-1.5">
              {post?.links?.map(({ label, url }) => (
                <Link
                  className="btn bg-primary hover:bg-secondary text-surface w-fit"
                  href={url}
                >
                  {label}
                </Link>
              ))}
              {post?.group && (
                <span className="py-[0.2em] px-[0.4em] rounded-[0.5em] whitespace-nowrap bg-tertiary text-primary w-fit max-w-full overflow-auto">
                  {post.group}
                </span>
              )}
            </div>
          </div>
        </div>
        <section className="layout-narrow markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "image", "group", "links", "slug", "content"],
    "communities"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "title"], "communities", "title");

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
