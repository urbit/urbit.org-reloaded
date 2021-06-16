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

import { name } from "../../lib/constants";

export default function Post({ post, nextPost, previousPost }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <SingleColumn>
        <Header />
        <section className="flex flex-col layout-wide pt-24">
          <h1>{post.title}</h1>
          {post.extra.author ? (
            <div className="type-ui text-gray mt-4">{post.extra.author}</div>
          ) : null}
          {post.extra.ship ? (
            <div className="type-ui text-gray font-mono">{post.extra.ship}</div>
          ) : null}
          <div className="type-ui text-gray mt-16">
            {formatDate(new Date(post.date))}
          </div>
        </section>
        <article className="flex justify-center pt-12">
          <Markdown post={post} />
        </article>
        <section className="layout-wide pt-24 flex">
          {previousPost === null ? (
            <div className={`w-1/2 mr-4`} />
          ) : (
            <div
              className={`cursor-pointer w-1/2 mr-4`}
              key={previousPost.slug}
            >
              <Link
                href={"/blog/" + previousPost.slug}
                key={`post-${previousPost.slug}`}
              >
                <div>
                  <h3>Previous Post</h3>
                  <BackgroundImage
                    className="w-full h-80 rounded-lg"
                    src={previousPost.extra.image || ""}
                  />
                  <p className="text-black mt-2">{previousPost.title || ""}</p>
                  <p className="text-gray">
                    {formatDate(new Date(previousPost.date))}
                  </p>
                </div>
              </Link>
            </div>
          )}
          {nextPost === null ? (
            <div className={`w-1/2 ml-4`} />
          ) : (
            <div className={`cursor-pointer w-1/2 ml-4`}>
              <Link
                href={"/blog/" + nextPost.slug}
                key={`post-${nextPost.slug}`}
              >
                <div>
                  <h3>Next Post</h3>
                  <BackgroundImage
                    className="w-full h-80 rounded-lg"
                    src={nextPost.extra.image || ""}
                  />
                  <p className="text-black mt-2">{nextPost.title || ""}</p>
                  <p className="text-gray">
                    {formatDate(new Date(nextPost.date))}
                  </p>
                </div>
              </Link>
            </div>
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
