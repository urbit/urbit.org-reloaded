import { useRouter } from "next/router";
import {
  getPostBySlug,
  getAllPosts,
  getNextPost,
  getPreviousPost,
  formatDate,
} from "../../lib/lib";
import Head from "next/head";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import Markdown from "../../components/Markdown";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SingleColumn from "../../components/SingleColumn";
import Contact from "../../components/Contact";
import EventPreview from "../../components/EventPreview";
import Section from "../../components/Section";
import markdownStyles from "../../styles/markdown.module.css";
import { decode } from "html-entities";

export default function Event({
  post,
  nextPost,
  previousPost,
  markdown,
  search,
}) {
  return (
    <Container>
      <Head>
        <title>{post.title} • Events • urbit.org</title>
        {Meta(post)}
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow short>
          <h1>{post.title}</h1>

          {post.extra.author ? (
            <div className="type-ui text-gray mt-4 md:mt-8 lg:mt-10">
              {post.extra.author}
            </div>
          ) : null}
          {post.extra.ship ? (
            <div className="type-ui text-gray font-mono">{post.extra.ship}</div>
          ) : null}

          <div className="mt-16">
            <p className="type-ui text-gray">
              {formatDate(new Date(post.date))} {", " + post.extra.time}
            </p>
            {post.registration_url && post.pinned ? (
              <a
                className="button-sm bg-green text-white flex-0 mt-4"
                href={post.extra.registration_url}
              >
                RSVP
              </a>
            ) : null}
          </div>
        </Section>
        <Section short wide>
          {post.extra.youtube ? (
            <iframe
              className="rounded-xl"
              width="100%"
              height="640px"
              src={`https://www.youtube.com/embed/${post.extra.youtube}`}
              frameBorder="0"
              allow="encrypted-media"
              allowfullscreen
            ></iframe>
          ) : null}
        </Section>
        <Section narrow className={markdownStyles["markdown"]}>
          <article
            className="pt-12 w-full"
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
        </Section>
        <Section narrow>
          <Contact />
        </Section>
        <Section wide className="flex">
          {previousPost === null ? (
            <div className={"w-1/2 mr-4"} />
          ) : (
            <EventPreview
              title="Previous Event"
              event={previousPost}
              className="mr-4 w-1/2"
            />
          )}
          {nextPost === null ? (
            <div className={"w-1/2 ml-4"} />
          ) : (
            <EventPreview
              title="Next Event"
              event={nextPost}
              className="ml-4 w-1/2"
            />
          )}
        </Section>
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
      "events"
    ) || null;

  const previousPost =
    getPreviousPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "events"
    ) || null;

  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
    "events"
  );

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown, nextPost, previousPost },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "events");

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
