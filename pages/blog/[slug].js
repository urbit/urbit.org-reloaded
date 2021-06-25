import { useRouter } from "next/router";
import { useState } from "react";
import {
  getPostBySlug,
  getAllPosts,
  getNextPost,
  getPreviousPost,
  formatDate,
} from "../../lib/lib";
import Head from "next/head";
import Link from "next/link";
import ErrorPage from "../404";
import Container from "../../components/Container";
import Markdown from "../../components/Markdown";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Search from "../../components/Search";
import BackgroundImage from "../../components/BackgroundImage";
import SingleColumn from "../../components/SingleColumn";
import NewsletterSignup from "../../components/NewletterSignup";
import PostPreview from "../../components/PostPreview";
import { name, contact } from "../../lib/constants";

export default function Post({ post, nextPost, previousPost }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const [showSearch, toggleSearch] = useState(false);
  return (
    <Container toggleSearch={() => toggleSearch((state) => !state)}>
      {showSearch && <Search toggleSearch={() => toggleSearch(!showSearch)} />}
      <SingleColumn>
        <Header toggleSearch={() => toggleSearch(true)} />
        <section className="flex flex-col layout-wide">
          <h1>{post.title}</h1>
          {post.extra.author ? (
            <div className="type-ui text-gray mt-4">{post.extra.author}</div>
          ) : null}
          {post.extra.ship ? (
            <div className="type-ui text-gray font-mono">{post.extra.ship}</div>
          ) : null}
          <div className="type-ui text-gray mt-8 md:mt-12 lg:mt-16">
            {formatDate(new Date(post.date))}
          </div>
        </section>
        <article className="layout-wide">
          <Markdown post={post} />
        </article>
        <section className="layout-narrow">
          <div className="measure">
            <h4 className="pb-6">
              If you’d like to follow our progress, we send monthly updates via
              email:
            </h4>
          </div>
          <NewsletterSignup color="black" />
          <h4 className="mt-12 text-gray">
            Follow us on{" "}
            <a className="text-black" href={contact.twitter}>
              Twitter
            </a>
          </h4>
          <h4 className="mt-6 text-gray">
            Explore code on{" "}
            <a className="text-black" href={contact.github}>
              Github
            </a>
          </h4>
          <h4 className="mt-6 text-gray">
            Ask questions in our{" "}
            <a className="text-black" href={contact.discord}>
              Discord
            </a>
          </h4>
          <h4 className="mt-6 text-gray">
            Boot Urbit and join{" "}
            <code className="bg-wall p-2 rounded-lg">
              {contact.urbitCommunity}
            </code>
          </h4>
        </section>
        <section className="layout-wide flex">
          {previousPost === null ? (
            <div className={"w-1/2 mr-4"} />
          ) : (
            <PostPreview
              title="Previous Post"
              post={previousPost}
              className="mr-4 w-1/2"
            />
          )}
          {nextPost === null ? (
            <div className={"w-1/2 ml-4"} />
          ) : (
            <PostPreview
              title="Next Post"
              post={nextPost}
              className="ml-4 w-1/2"
            />
          )}
        </section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const nextPost =
    getNextPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "blog"
    ) || null;

  const previousPost =
    getPreviousPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "blog"
    ) || null;

  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
    "blog"
  );

  return {
    props: { post, nextPost, previousPost },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "blog");

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
