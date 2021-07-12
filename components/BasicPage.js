import { useRouter } from "next/router";
import ErrorPage from "../pages/404";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import SingleColumn from "./SingleColumn";
import markdownStyles from "../styles/markdown.module.css";
import { decode } from "html-entities";

export default function BasicPage({ post, markdown, search }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  return (
    <Container>
      <SingleColumn>
        <Header search={search} />
        <section className="flex flex-col layout-narrow">
          <h1>{post.title}</h1>
        </section>
        <div className={"layout-narrow " + markdownStyles["markdown"]}>
          <article
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
        </div>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
