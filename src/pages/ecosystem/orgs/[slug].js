import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Main,
  Section,
  Markdown,
  getPostBySlug,
  getAllPosts,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import ErrorPage from "@/pages/404";
import AppCard from "@/components/ecosystem/App";

export default function Org({ post, markdown, apps }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Companies • Ecosystem • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Header
        pages={[
          { title: "Overview", href: "/ecosystem" },
          { title: "Apps", href: "/ecosystem/apps" },
          { title: "Podcasts", href: "/ecosystem/podcasts" },
          { title: "Talks", href: "/ecosystem/talks" },
          { title: "Companies", href: "/ecosystem/orgs" },
          { title: "Articles & Press", href: "/ecosystem/articles" },
        ]}
        path={router.asPath}
      />
      <Main className="text-primary" responsiveSpace singleColumn>
        <div className="flex">
          <div className="relative flex items-center aspect-square bg-container w-1/3 rounded-md">
            <img src={post.image} />
          </div>
          <div className="flex flex-col justify-between pl-5 md:pl-8 lg:pl-16">
            <h1 className="h1">{post.title}</h1>
            <div className="flex flex-col space-y-3.5">
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-md w-min"
                href={post.URL}
              >
                Website
              </Link>
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-md w-min"
                href={`https://twitter.com/${post.twitter}`}
              >
                {`@${post.twitter}`}
              </Link>
            </div>
          </div>
        </div>
        {post.description && (
          <h2 className="h2 layout-narrow">{post.description}</h2>
        )}
        <section className="layout-narrow markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </section>
        {apps.length > 0 && (
          <Section divider={"border-primary"}>
            <h2 className="h2">Apps</h2>
            <div className="hidden md:grid grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
              {apps && apps.slice(0, 8).map((props) => <AppCard {...props} />)}
            </div>
            <div className="grid md:hidden grid-cols-2 xs:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
              {apps && apps.slice(0, 6).map((props) => <AppCard {...props} />)}
            </div>
          </Section>
        )}
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    [
      "title",
      "description",
      "image",
      "URL",
      "twitter",
      "ships",
      "slug",
      "content",
    ],
    "ecosystem/orgs"
  );
  const apps = getAllPosts(
    ["title", "description", "bgColor", "image", "shortcode", "weight", "slug"],
    "ecosystem/apps",
    "weight"
  ).filter((app) => post.ships.includes(app.shortcode.split("/")[0]));

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown, apps },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"], "ecosystem/orgs");

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
