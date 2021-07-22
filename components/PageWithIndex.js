import { useState, useEffect, useRef } from "react";
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
  const [activeId, setActiveId] = useState();
  useIntersectionObserver(setActiveId);
  return (
    <nav
      className="sticky min-h-0 overflow-y-scroll w-52 flex-shrink-0 pb-24 hidden lg:block"
      style={{ top: "8rem", height: "calc(100vh - 16rem)" }}
    >
      <Headings headings={nestedHeadings} activeId={activeId} />
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

const Headings = ({ headings, activeId }) => (
  <ul>
    {headings.map((heading) => (
      <li key={heading.id}>
        <a className="font-semibold" href={`#${heading.id}`}>
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="pl-2">
            {heading.items.map((child) => (
              <li
                key={child.id}
                className={child.id === activeId ? "text-green" : "text-gray"}
              >
                <a href={`#${child.id}`}>{child.title}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({});
  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -50% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

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
