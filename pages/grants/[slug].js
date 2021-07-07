import { useRouter } from "next/router";
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
import BackgroundImage from "../../components/BackgroundImage";
import SingleColumn from "../../components/SingleColumn";
import NewsletterSignup from "../../components/NewletterSignup";
import PostPreview from "../../components/PostPreview";
import { name, contact } from "../../lib/constants";
import markdownStyles from "../../styles/markdown.module.css";
import { decode } from "html-entities";

export default function Grant({
  post,
  nextPost,
  markdown,
  previousPost,
  toggleSearch,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
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
        <div className={"layout-wide " + markdownStyles["markdown"]}>
          <article
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
        </div>

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
      "grants"
    ) || null;

  const previousPost =
    getPreviousPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "grants"
    ) || null;

  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
    "grants"
  );

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown, nextPost, previousPost },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "grants");

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
