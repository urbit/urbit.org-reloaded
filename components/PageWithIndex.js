import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "../pages/404";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import SingleColumn from "./SingleColumn";
import Section from "./Section";
import markdownStyles from "../styles/markdown.module.css";
import { decode } from "html-entities";

const TableOfContents = () => {
  const { nestedHeadings } = useHeadingsData();
  return (
    <nav
      className="sticky min-h-0 h-screen overflow-y-scroll w-52 flex-shrink-0 pb-8 hidden lg:block"
      style={{ top: 0 }}
    >
      <p>On this page</p>
      <Headings headings={nestedHeadings} />
    </nav>
  );
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const Headings = ({ headings }) => (
  <ul>
    {headings.map((heading) => (
      <li key={heading.id}>
        <a className="font-semibold text-sm" href={`#${heading.id}`}>
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="pl-2 text-sm">
            {heading.items.map((child) => (
              <li key={child.id}>
                <a href={`#${child.id}`}>{child.title}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

export default function PageWithIndex({ post, markdown, search }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  return (
    <Container>
      <Head>
        <title>Urbit • {post.title}</title>
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <h1>{post.title}</h1>
        </Section>
        <Section narrow>
          <div className="flex">
            <article
              className={markdownStyles["markdown"] + " pr-0 lg:pr-16"}
              dangerouslySetInnerHTML={{ __html: decode(markdown) }}
            ></article>
            <TableOfContents />
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
