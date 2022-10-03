import { useRouter } from "next/router";
import Head from "next/head";
import Meta from "../../../components/Meta";
import ErrorPage from "../../../pages/404";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
  IntraNav,
  getAllPosts,
  getPostBySlug,
} from "@urbit/foundation-design-system";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Post from "../../../components/ecosystem/Post";
import fs from "fs";
import path from "path";

export default function BasicPage({ post, markdown, search, index = false }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  return (
    <Container>
      <Head>
        <title>Ecosystem Spotlight - {post.title}</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section narrow>
          <h1>Ecosystem Spotlight - {post.title}</h1>
        </Section>
        <Section narrow>
          <Post post={post} />
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight"
  );
  const marketplaces = getAllPosts(["title", "image", "slug"], "marketplaces");
  const podcasts = getAllPosts(
    ["title", "image", "date", "podcast", "slug"],
    "podcasts",
    "date"
  );
  const articles = getAllPosts(
    ["title", "image", "date", "publication", "author", "slug"],
    "articles",
    "date"
  );
  const organizations = getAllPosts(
    ["title", "image", "slug"],
    "organizations"
  );
  const applications = fs
    .readdirSync(path.join(process.cwd(), "content/applications"), {
      withFileTypes: true,
    })
    .filter((f) => f.isDirectory())
    .map((dir) =>
      getAllPosts(
        ["title", "bgColor", "image", "slug", "description"],
        `applications/${dir.name}`
      )
        .map((e) => ({ ...e, ship: dir.name }))
        .flat()
    )
    .flat()
    .sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return nameA < nameB ? -1 : 1;
    });

  ["featured-1", "featured-2", "featured-3"].forEach((feat) => {
    if (post?.[feat]) {
      const matchedPost = [
        ...applications.map((e) => ({ ...e, type: "Application" })),
        ...organizations.map((e) => ({ ...e, type: "Organization" })),
        ...podcasts.map((e) => ({ ...e, type: "Podcast" })),
        ...marketplaces.map((e) => ({ ...e, type: "Marketplace" })),
        ...articles.map((e) => ({ ...e, type: "Article" })),
      ].filter((e) => e.title === post[feat].title)?.[0];
      post[feat].image = post[feat]?.image || matchedPost?.image || null;
      post[feat].type = matchedPost?.type || "Podcast";
      post[feat].matchedPost = matchedPost || null;
      post[feat].content = JSON.stringify(
        Markdown.parse({
          post: { content: post[feat].content },
        })
      );
    }
  });

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "ecosystem/spotlight", "date");

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
