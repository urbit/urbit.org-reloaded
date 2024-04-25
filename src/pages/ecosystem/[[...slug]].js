import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import path from "path";
import {
  Container,
  Main,
  Section,
  FatBlock,
  getAllPosts,
  generateDisplayDate,
  formatDate,
} from "@urbit/fdn-design-system";

import AppCard from "@/components/ecosystem/App";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";
import OrgCard from "@/components/ecosystem/Org";

function Filter({ className = "", children, filters = [] }) {
  const [filter, setFilter] = useState(
    Object.fromEntries(
      new Map(filters.map((o) => [o.key, { ...o, value: false }])),
    ),
  );

  const filterChildren = () => {
    let filtered = [...children];
    filters.forEach(({ key }) => {
      if (filter[key].value) {
        filtered = filtered.filter((c) => c.props[key] === filter[key].value);
      }
    });
    return filtered;
  };

  const getFilterValues = ({ key }) => {
    let vals = new Set([]);
    children.forEach((c) => {
      vals.add(c.props[key]);
    });
    return new Array(...vals);
  };

  const toggleFilter = ({ key }, v) => {
    let filterCopy = { ...filter };
    if (filter[key].value === v) {
      filterCopy[key].value = false;
    } else {
      filterCopy[key].value = v;
    }
    setFilter(filterCopy);
  };

  return (
    <>
      {filters.map((f) => (
        <nav className="flex items-center w-full h-12 nav-space-x text-gray whitespace-nowrap overflow-x-auto type-ui">
          <button
            className={classnames("btn border-2", {
              "border-tertiary text-primary": filter[f.key].value !== false,
              "border-primary bg-primary text-tertiary":
                filter[f.key].value === false,
            })}
            onClick={() => toggleFilter(f, false)}
          >
            {f.allLabel}
          </button>
          {getFilterValues(f).map((v) => (
            <button
              className={classnames("btn border-2 border-brite", {
                "border-tertiary text-primary": filter[f.key].value !== v,
                "border-primary bg-primary text-tertiary":
                  filter[f.key].value === v,
              })}
              onClick={() => toggleFilter(f, v)}
            >
              {v}
            </button>
          ))}
        </nav>
      ))}
      <div className={classnames("mt-5", className)}>
        {filterChildren(children)}
      </div>
    </>
  );
}

function PodcastCard({
  className,
  title,
  description,
  image,
  links,
  slug,
  content,
}) {
  return (
    <Link
      className={classnames("flex flex-col", className)}
      href={path.join("/ecosystem", "podcasts", slug)}
    >
      <img className="aspect-square rounded-t-xl object-cover" src={image} />
      <div className="bg-container-variant rounded-b-xl p-4">
        <h3 className="h3 font-semibold text-on-container line-clamp-1 text-ellipsis">
          {title}
        </h3>
        <div className="hidden md:block">
          <p className="h-[2.6em] body-md text-on-container-variant line-clamp-2 text-ellipsis">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function TalkCard({ className, title, image, url }) {
  return (
    <Link
      className={classnames("flex flex-col", className)}
      href={url}
      target="_blank"
    >
      <div className="relative aspect-[16/9] rounded-t-xl">
        <img
          className="absolute h-full w-full rounded-t-xl object-cover"
          src={image}
        />
        <svg
          className="absolute z-10 h-1/4 m-auto top-0 right-0 bottom-0 left-0"
          width="68"
          height="97"
          viewBox="0 0 68 97"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1082_1728)">
            <path
              d="M55.8737 48.5L9.06684 83.4636V13.5364L55.8737 48.5ZM68 48.5C68 47.0344 67.3207 45.6797 66.1877 44.8901L7.25448 0.9031C7.0517 0.761833 6.82357 0.678586 6.60812 0.567591C6.45096 0.484344 6.31155 0.391007 6.14679 0.325419C5.64238 0.128654 5.11261 0 4.53469 0C2.04048 0 0 2.03071 0 4.51045V92.487C0 94.9693 2.04048 96.9975 4.53215 96.9975C5.11008 96.9975 5.63731 96.8688 6.14426 96.6721C6.30902 96.6065 6.44843 96.5131 6.60305 96.4324C6.82104 96.3189 7.0517 96.2356 7.25448 96.0944L66.1877 52.1048C67.3207 51.3153 68 49.9606 68 48.495"
              fill="#F8FAF8"
            />
          </g>
          <defs>
            <clipPath id="clip0_1082_1728">
              <rect width="68" height="97" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="bg-container-variant p-4 rounded-b-xl">
        <h3 className="h3 h-[1.3em] text-on-container line-clamp-1 text-ellipsis">
          {title}
        </h3>
      </div>
    </Link>
  );
}

function Article({
  title,
  publication,
  author,
  type,
  date,
  image,
  URL,
  divider = false,
}) {
  const displayDate = generateDisplayDate(date);

  return (
    <>
      {divider && <hr className="hr-horizontal border-primary" />}
      <Link
        className="flex h-28 xs:h-36 md:h-44 w-full"
        href={URL}
        target="_blank"
      >
        <img
          className="aspect-square h-full mr-6 lg:mr-16"
          alt=""
          src={image}
        />
        <div className="flex flex-col flex-1 justify-between">
          <div className="flex flex-col">
            <div className="flex w-full sm:mb-2.5 text-secondary body-md">
              <p className="w-full sm:w-1/2">{publication}</p>
              <p className="hidden sm:block w-1/2">Author: {author}</p>
            </div>
            <h3 className="h3 h-[2.6em] line-clamp-2 text-ellipsis">{title}</h3>
          </div>
          <div className="flex w-full text-secondary body-md">
            <p className="hidden sm:block w-1/2">{type || "Article"}</p>
            <p className="w-full sm:w-1/2">{formatDate(displayDate)}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default function Ecosystem({ apps, articles, orgs, podcasts, talks }) {
  const router = useRouter();
  const type = router.query?.slug?.[0] || "overview";

  let title = "Ecosystem";
  if (type) {
    switch (type) {
      case "apps":
        title = "Apps";
        break;
      case "podcasts":
        title = "Podcasts";
        break;
      case "talks":
        title = "Talks";
        break;
      case "orgs":
        title = "Companies";
        break;
      case "articles":
        title = "Articles";
        break;
    }
  }

  const post = { title: title, description: "Explore the Urbit ecosystem." };

  return (
    <Container>
      <Head>
        <title>{`${title} ${
          title !== "Ecosystem" ? "• Ecosystem " : ""
        }• urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Header
        pages={[
          { title: "Overview", href: "/ecosystem" },
          { title: "Apps", href: "/ecosystem/apps" },
          { title: "Podcasts", href: "/ecosystem/podcasts" },
          { title: "Talks", href: "/ecosystem/talks" },
          { title: "Companies", href: "/ecosystem/orgs" },
          { title: "Articles & Press", href: "/ecosystem/articles" },
        ]}
        path={router.asPath}
      />
      <Main className="text-primary overflow-x-hidden" singleColumn>
        {type === "overview" && (
          <>
            <section className="">
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Ecosystem</h1>
              <p className="h1">
                Urbit's decentralized ecosystem is growing more than ever, check
                out the <strong>Apps, Podcasts, Talks, Companies</strong> and
                more below.
              </p>
            </section>
            <Section divider={"border-primary"}>
              <h2 className="h2">Apps</h2>
              <FatBlock className="hidden md:grid grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
                {apps &&
                  apps.slice(0, 8).map((props) => <AppCard {...props} />)}
              </FatBlock>
              <FatBlock className="grid md:hidden grid-cols-2 xs:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
                {apps &&
                  apps.slice(0, 6).map((props) => <AppCard {...props} />)}
              </FatBlock>
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-lg"
                href="/ecosystem/apps"
              >
                More apps
              </Link>
            </Section>
            <Section divider={"border-primary"}>
              <h2 className="h2">Podcasts</h2>
              <Carousel>
                {podcasts &&
                  podcasts.map((props) => (
                    <PodcastCard
                      className="w-60 sm:w-96 md:w-[24rem]"
                      {...props}
                    />
                  ))}
              </Carousel>
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-lg"
                href="/ecosystem/podcasts"
              >
                More podcasts
              </Link>
            </Section>
            <Section divider={"border-primary"}>
              <h2 className="h2">Talks</h2>
              <Carousel>
                {talks &&
                  talks.map((props) => (
                    <TalkCard
                      className="w-80 sm:w-96 md:w-[30rem]"
                      {...props}
                    />
                  ))}
              </Carousel>
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-lg"
                href="/ecosystem/talks"
              >
                More talks
              </Link>
            </Section>
            <Section divider={"border-primary"}>
              <h2 className="h2">Companies</h2>
              <FatBlock className="hidden md:grid grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
                {orgs &&
                  orgs.slice(0, 8).map((props) => <OrgCard {...props} />)}
              </FatBlock>
              <FatBlock className="grid md:hidden grid-cols-2 xs:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
                {orgs &&
                  orgs.slice(0, 6).map((props) => <OrgCard {...props} />)}
              </FatBlock>
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-lg"
                href="/ecosystem/orgs"
              >
                More companies
              </Link>
            </Section>
            <Section divider={"border-primary"}>
              <h2 className="h2">Articles & Press</h2>
              {articles &&
                articles
                  .slice(0, 3)
                  .map((props, index) => (
                    <Article divider={index > 0} {...props} />
                  ))}
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-lg"
                href="/ecosystem/articles"
              >
                More articles & press
              </Link>
            </Section>
          </>
        )}
        {type === "apps" && (
          <>
            <section>
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Apps</h1>
              <p className="h1">
                Urbit Apps are distributed entirely{" "}
                <strong>peer-to-peer</strong>. Check out the Apps that we like
                below and install them on your <strong> Planet</strong>.
              </p>
            </section>
            <Section divider={"border-primary"}>
              <FatBlock className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
                {apps && apps.map((props) => <AppCard {...props} />)}
              </FatBlock>
            </Section>
          </>
        )}
        {type === "podcasts" && (
          <>
            <section>
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Podcasts</h1>
              <p className="h1">
                Here are some Podcasts we like. We also have our own called{" "}
                <strong>ZeroK</strong>.
              </p>
            </section>
            <Section divider={"border-primary"}>
              <FatBlock className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
                {podcasts &&
                  podcasts.map((props) => <PodcastCard {...props} />)}
              </FatBlock>
            </Section>
          </>
        )}
        {type === "talks" && (
          <>
            <section>
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Talks</h1>
              <p className="h1">Talking about Urbit never gets old.</p>
            </section>
            <Section divider={"border-primary"}>
              <FatBlock>
                <Filter
                  className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 xl:gap-8"
                  filters={[
                    { key: "event", allLabel: "All events" },
                    { key: "type", allLabel: "All categories" },
                  ]}
                >
                  {talks && talks.map((props) => <TalkCard {...props} />)}
                </Filter>
              </FatBlock>
            </Section>
          </>
        )}
        {type === "orgs" && (
          <>
            <section>
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Companies</h1>
              <p className="h1">
                Our ecosystem is building{" "}
                <strong>
                  blockchains, custom hardware, ZK provers, social networks,
                  prediction markets, games
                </strong>{" "}
                and more. Dig deeper below.
              </p>
            </section>
            <Section divider={"border-primary"}>
              <FatBlock className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
                {orgs && orgs.map((props) => <OrgCard {...props} />)}
              </FatBlock>
            </Section>
          </>
        )}
        {type === "articles" && (
          <>
            <section>
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Articles & Press</h1>
              <p className="h1">
                Urbit in the <strong>news</strong>.
              </p>
            </section>
            <Section divider={"border-primary"}>
              <FatBlock>
                <Filter
                  className="space-y-5"
                  filters={[{ key: "type", allLabel: "All categories" }]}
                >
                  {articles &&
                    articles.map((props, index) => (
                      <Article divider={index > 0} {...props} />
                    ))}
                </Filter>
              </FatBlock>
            </Section>
          </>
        )}
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const apps = getAllPosts(
    ["title", "description", "bgColor", "image", "weight", "slug"],
    "ecosystem/apps",
    "weight",
  );
  const articles = getAllPosts(
    ["title", "publication", "author", "type", "date", "image", "URL", "slug"],
    "ecosystem/articles",
    "date",
  );
  const orgs = getAllPosts(
    ["title", "image", "weight", "slug"],
    "ecosystem/orgs",
    "weight",
  );
  const podcasts = getAllPosts(
    ["title", "description", "image", "links", "weight", "slug", "content"],
    "ecosystem/podcasts",
    "weight",
  );
  const talks = getAllPosts(
    ["title", "event", "date", "type", "image", "url", "slug"],
    "ecosystem/talks",
    "date",
  );

  return {
    props: {
      apps,
      articles,
      orgs,
      podcasts,
      talks,
    },
  };
}

export async function getStaticPaths() {
  const slugs = [
    "/ecosystem",
    "/ecosystem/apps",
    "/ecosystem/podcasts",
    "/ecosystem/talks",
    "/ecosystem/orgs",
    "/ecosystem/articles",
  ];

  return {
    paths: slugs,
    fallback: false,
  };
}
