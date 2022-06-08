import { getPostBySlug } from "../lib/lib";
import BasicPage from "../components/BasicPage";
import { MarkdownParse } from "../components/Markdown";

export default function Post({ post, markdown, search }) {
  return <BasicPage post={post} markdown={markdown} search={search} />;
}

export async function getStaticProps() {
  const post = getPostBySlug("/audits", ["title", "slug", "content"], "/");

  const markdown = JSON.stringify(MarkdownParse({ post }));

  return {
    props: { post, markdown },
  };
}
