import { getPostBySlug } from "../lib/lib";
import PageWithIndex from "../components/PageWithIndex";
import { MarkdownParse } from "../components/Markdown";

export default function Post({ post, markdown, search }) {
  return <PageWithIndex post={post} markdown={markdown} search={search} />;
}

export async function getStaticProps() {
  const post = getPostBySlug("/privacy", ["title", "slug", "content"], "/");

  const markdown = JSON.stringify(MarkdownParse({ post }));

  return {
    props: { post, markdown },
  };
}
