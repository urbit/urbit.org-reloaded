import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Main,
  Section,
  FatBlock,
  Markdown,
  getPostBySlug,
  getAllPosts,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import OrgCard from "@/components/ecosystem/Org";
import ErrorPage from "@/pages/404";

export default function App({ post, org, markdown }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Apps • Ecosystem • urbit.org`}</title>
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
          <img
            className="aspect-square w-1/3 rounded-md"
            style={{ backgroundColor: post.bgColor }}
            alt=""
            src={post.image}
          />
          <div className="flex flex-col justify-between pl-5 md:pl-10 lg:pl-[3.75rem]">
            <h1 className="h1">{post.title}</h1>
            <button
              className="btn bg-primary hover:bg-secondary text-surface body-md"
              onClick={() => navigator.clipboard.writeText(post.shortcode)}
            >
              Copy Shortcode
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row body-md">
          {post.website && (
            <div className="flex sm:flex-col sm:w-1/3 mr-5 md:mr-10 lg:mr-[3.75rem]">
              <h3 className="text-tertiary mr-[0.25em]">Website:</h3>
              <Link
                className="text-primary hover:text-secondary underline decoration-1 underline-offset-4 line-clamp-1 text-ellipsis break-all"
                href={post.website}
              >
                {post.website}
              </Link>
            </div>
          )}
          {post.license && (
            <div className="flex sm:flex-col">
              <h3 className="text-tertiary mr-[0.25em]">License:</h3>
              <p className="line-clamp-1 text-ellipsis">{post.license}</p>
            </div>
          )}
        </div>
        {post.description && (
          <h2 className="h2 layout-narrow">{post.description}</h2>
        )}
        <section className="layout-narrow markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </section>
        <Section tight divider={"border-primary"}>
          <h2 className="h2">Developer</h2>
          {(org.slug && (
            <FatBlock>
              <OrgCard className="w-1/3" {...org} />
            </FatBlock>
          )) || <p className="body-md">{org.title}</p>}
          <hr className="hr-horizontal border-primary" />
          <div className="layout-narrow">
            <FatBlock className="bg-tertiary body-sm rounded-md p-5">
              Disclaimer: Applications may not be audited for security and might
              contain malicious code or vulnerabilities that could lead to
              unwanted interaction with your ship. Explore at your own risk.
            </FatBlock>
          </div>
          <hr className="hr-horizontal border-primary" />
          <Link
            className="btn bg-primary hover:bg-secondary text-surface body-md"
            href="https://docs.urbit.org/manual/getting-started/additional/installing-applications"
          >
            How to Install an Urbit Application
          </Link>
        </Section>
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
      "shortcode",
      "license",
      "image",
      "bgColor",
      "developer",
      "website",
      "description",
      "slug",
      "content",
    ],
    "ecosystem/apps"
  );

  let org = { title: post.developer };

  const orgs = getAllPosts(
    ["title", "image", "ships", "slug"],
    "ecosystem/orgs"
  );

  if (post.shortcode) {
    const ship = post.shortcode.split("/")[0];
    for (let i = 0; i < orgs.length; i++) {
      if (orgs[i].ships.filter((s) => s === ship).length > 0) {
        org = orgs[i];
        break;
      }
    }
  }

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, org, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "ecosystem/apps", "date");

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
