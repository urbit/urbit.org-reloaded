import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import {
  Container,
  Main,
  Section,
  Markdown,
  getPage,
  getNextPost,
  getPreviousPost,
} from "@urbit/fdn-design-system";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";
import contentTree from "@/../cache/overview.json";

export default function Overview({
  posts,
  data,
  markdown,
  previousPost,
  nextPost,
}) {
  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>{`${data.title} • Overview • urbit.org`}</title>
        {Meta(data)}
      </Head>
      <IntraNav />
      <Header
        pages={[
          { title: "Introduction", href: "/overview" },
          ...posts.pages.map((page) => ({
            title: page.title,
            href: path.join("/overview", page.slug),
          })),
        ]}
        path={router.asPath}
      />
      <Main className="text-primary" singleColumn>
        <div>
          <h1 className="h1 mb-8 md:mb-16 lg:mb-20">{data.title}</h1>
          <Section className="markdown layout-narrow">
            <Markdown.render content={JSON.parse(markdown)} />
          </Section>
          <div className="flex gap-1.5 justify-center w-full">
            {previousPost && (
              <Link
                className="btn body-md bg-primary text-surface hover:bg-secondary"
                href={previousPost.slug}
              >
                ← {previousPost?.title}
              </Link>
            )}
            {nextPost && (
              <Link
                className="btn body-md bg-primary text-surface hover:bg-secondary"
                href={nextPost.slug}
              >
                {nextPost?.title} →
              </Link>
            )}
          </div>
        </div>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const posts = contentTree;

  const { data, content } = getPage(
    path.join(process.cwd(), "content/overview", params.slug?.join("/") || "/"),
  );
  const markdown = JSON.stringify(Markdown.parse({ post: { content } }));

  const previousPost =
    getPreviousPost(
      params.slug?.slice(-1).join("") || "overview",
      ["title", "slug", "weight"],
      path.join("overview", params.slug?.slice(0, -1).join("/") || "/"),
      "weight",
    ) ||
    (params.slug
      ? params.slug?.join("/") === posts.pages?.[0]?.slug
        ? { title: "Introduction", slug: "", weight: 0 }
        : null
      : null);

  const nextPost =
    getNextPost(
      params.slug?.slice(-1).join("") || "overview",
      ["title", "slug", "weight"],
      path.join("overview", params.slug?.slice(0, -1).join("/") || "/"),
      "weight",
    ) || (params.slug ? null : posts.pages[0]);

  return { props: { posts, data, markdown, params, previousPost, nextPost } };
}

export async function getStaticPaths() {
  const posts = contentTree;

  const slugs = [];

  const allHrefs = (thisLink, tree) => {
    slugs.push(thisLink, ...tree.pages.map((e) => path.join(thisLink, e.slug)));
    allHrefsChildren(thisLink, tree.children);
  };

  const allHrefsChildren = (thisLink, children) => {
    Object.entries(children).map(([childSlug, child]) => {
      allHrefs(path.join(thisLink, childSlug), child);
    });
  };

  allHrefs("/overview", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
