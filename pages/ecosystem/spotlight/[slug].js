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
} from "foundation-design-system";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Post from "../../../components/ecosystem/Post";
import { getAllPosts, getPostBySlug } from "../../../lib/lib";

export default function BasicPage({ post, markdown, search, index = false }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  return (
    <Container>
      <Head>
        <title>Urbit • {post.title}</title>
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
  ["featured-1", "featured-2", "featured-3"].forEach((feat) => {
    if (post?.[feat]) {
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
