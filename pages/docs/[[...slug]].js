import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { join } from "path";
import {
  getPreviousPost,
  getNextPost,
  buildPageTree,
  getPage,
} from "../../lib/lib";
import Pagination from "../../components/Pagination";
import Markdown from "../../components/Markdown";
import ContentArea from "../../components/ContentArea";
import Sidebar from "../../components/Sidebar";
import markdownStyles from "../../styles/markdown.module.css";
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

const breadcrumbs = (posts, paths) => {
  const results = [
    <Link href="/">Urbit</Link>,
    <span className="px-1">/</span>,
    <Link href="/docs">Documentation</Link>,
  ];
  let thisLink = "/docs";
  for (const path of paths) {
    posts = posts.children[path];
    thisLink = join(thisLink, path);
    results.push(
      <span className="px-1">/</span>,
      <Link href={thisLink}>{posts.title}</Link>
    );
  }
  return results;
};

const childPages = (thisLink, children, level = 0) => (
  <ul className="pl-0">
    {Object.entries(children).map(([childSlug, child]) => (
      <li>{pageTree(join(thisLink, childSlug), child, level)}</li>
    ))}
  </ul>
);

const pageTree = (thisLink, tree, level = 0) => {
  const router = useRouter();
  const firstCrumb = "/" + router.asPath.split("/").slice(1, -1).join("/");

  const includesThisPage = firstCrumb.includes(thisLink);
  const isThisPage = router.asPath === thisLink;
  const [isOpen, toggleTree] = useState(includesThisPage);

  const activeClasses = classnames({
    hidden: !isOpen,
  });

  const headingItemClasses = classnames({
    "pl-0 text-black text-base font-semibold hover:text-green leading-relaxed":
      level === 0,
    "pl-4 text-black text-base font-semibold hover:text-green": level === 1,
    "pl-8 text-black text-base hover:text-green": level === 2,
  });

  const pageItemClasses = classnames({
    "pl-4 text-black text-base hover:text-green": level === 0,
    "pl-8 text-black text-base hover:text-green": level === 1,
    "pl-12 text-black text-base hover:text-green": level === 2,
  });

  return (
    <>
      <span onClick={() => toggleTree(!isOpen)}>
        <p className={`${headingItemClasses} cursor-pointer`}>{tree.title}</p>
      </span>
      <div className={activeClasses}>
        <ul className={""}>
          {tree.pages.map(({ title, slug }) => {
            const href = join(thisLink, slug);
            const isSelected = router.asPath === href;
            const selectedClasses = classnames({
              dot: isSelected,
              "text-green": isSelected,
            });
            return (
              <li>
                <Link href={href}>
                  <a
                    className={`relative ${pageItemClasses} ${selectedClasses}`}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {childPages(thisLink, tree.children, level + 1)}
      </div>
    </>
  );
};

export default function DocsLayout({
  posts,
  data,
  params,
  search,
  markdown,
  previousPost,
  nextPost,
}) {
  const router = useRouter();
  const isSelected = "/docs".includes(router.asPath);
  const selectedClasses = classnames({
    dot: isSelected,
    "text-green": isSelected,
    "text-black": !isSelected,
  });
  const rootClasses = "pl-0 text-base hover:text-green";
  return (
    <>
      <Head>
        <title>{data.title} • Documentation • urbit.org</title>
      </Head>
      <div className="flex w-screen h-screen min-h-screen w-screen">
        <Sidebar search={search}>
          <ul>
            <li>
              <Link href="/docs">
                <a className={`relative ${selectedClasses} ${rootClasses}`}>
                  Developer Documentation
                </a>
              </Link>
            </li>
          </ul>
          {childPages("/docs", posts.children)}
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title={data.title}
          search={search}
          section="Urbit Documentation"
        >
          <div className={markdownStyles["markdown"]}>
            <article
              dangerouslySetInnerHTML={{ __html: decode(markdown) }}
            ></article>
          </div>
          <div className="flex justify-between mt-16">
            {previousPost === null ? (
              <div className={""} />
            ) : (
              <Pagination
                previous
                title="Previous Post"
                post={previousPost}
                className=""
                section={join("docs", params.slug?.slice(0, -1).join("/"))}
              />
            )}
            {nextPost === null ? (
              <div className={""} />
            ) : (
              <Pagination
                next
                title="Next Post"
                post={nextPost}
                className=""
                section={join("docs", params.slug?.slice(0, -1).join("/"))}
              />
            )}
          </div>
        </ContentArea>
        <TableOfContents />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const posts = buildPageTree(join(process.cwd(), "content/docs"), "weight");

  const { data, content } = getPage(
    join(process.cwd(), "content/docs", params.slug?.join("/") || "/")
  );

  const previousPost =
    getPreviousPost(
      params.slug?.slice(-1).join("") || "docs",
      ["title", "slug", "weight"],
      join("docs", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const nextPost =
    getNextPost(
      params.slug?.slice(-1).join("") || "docs",
      ["title", "slug", "weight"],
      join("docs", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const markdown = await Markdown({ post: { content: content } });

  return { props: { posts, data, markdown, previousPost, nextPost, params } };
}

export async function getStaticPaths() {
  const posts = buildPageTree(join(process.cwd(), "content/docs"), "weight");
  const slugs = [];

  const allHrefs = (thisLink, tree) => {
    slugs.push(thisLink, ...tree.pages.map((e) => join(thisLink, e.slug)));
    allHrefsChildren(thisLink, tree.children);
  };

  const allHrefsChildren = (thisLink, children) => {
    Object.entries(children).map(([childSlug, child]) => {
      allHrefs(join(thisLink, childSlug), child);
    });
  };

  allHrefs("/docs", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
