import Head from "next/head";
import Link from "next/link";
import { getPostBySlug } from "../../lib/lib";
import Meta from "../../components/Meta";
import Markdown from "../../components/Markdown";
import Container from "../../components/Container";
import SingleColumn from "../../components/SingleColumn";
import Section from "../../components/Section";
import { decode } from "html-entities";

export default function GuidePage({ post, markdown }) {
  return (
    <Container>
      <Head>
        <title>Urbit • {post.title}</title>
        {Meta(post)}
      </Head>
      <SingleColumn>
        <Section narrow>
          <h2>{post.title}</h2>
        </Section>
        <Section narrow className="markdown">
          <article
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
          <Link href="/">
            <a className="text-xl pt-12 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const post = getPostBySlug("get", ["title", "slug", "content"], "id");

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown },
  };
}
