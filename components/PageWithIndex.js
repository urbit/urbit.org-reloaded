import { useRouter } from "next/router";
import Head from "next/head";
import Meta from "../components/Meta";
import ErrorPage from "../pages/404";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import SingleColumn from "./SingleColumn";
import Section from "./Section";
import { decode } from "html-entities";
import Markdown from "../components/Markdown";
import { TableOfContents } from "./TableOfContents";

export default function PageWithIndex({ post, search }) {
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
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <h1>{post.title}</h1>
        </Section>
        <Section narrow>
          <div className="flex sidebar">
            <div className="markdown">
              <Markdown post={post} />
            </div>
            <TableOfContents />
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
