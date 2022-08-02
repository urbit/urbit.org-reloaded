import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Meta from "../Meta";
import ErrorPage from "../../pages/404";
import classnames from "classnames";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
  IntraNav,
} from "@urbit/foundation-design-system";
import Header from "../Header";
import Footer from "../Footer";

export default function BasicPage({
  section,
  post,
  markdown,
  search,
  children,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  return (
    <Container>
      <Head>
        <title>
          {post.title} • {section} • Urbit
        </title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section narrow className="space-y-12">
          <div className="flex items-center space-x-4">
            <img src={post.image} className="w-36" />
            <div className="flex flex-col pl-2">
              <h1
                className={classnames({ "text-3xl": section === "Podcasts" })}
              >
                {post.title}
              </h1>
              <p>{section.slice(0, -1)}</p>
            </div>
          </div>
          {/* General purpose metadata bar -- podcast listen button is special-cased URL, flexed at the end of the row */}
          <div className="flex justify-between">
            <div className="flex space-x-12">
              {post?.podcast && (
                <div className="flex flex-col">
                  <p className="font-bold text-wall-400">Podcast</p>
                  <p>{post.podcast}</p>
                </div>
              )}
              {post?.date && (
                <div className="flex flex-col">
                  <p className="font-bold text-wall-400">Date</p>
                  <p className="shrink-0">{post.date}</p>
                </div>
              )}
              {post?.URL && section !== "Podcasts" && (
                <div className="flex flex-col">
                  <p className="font-bold text-wall-400">Website</p>
                  <a
                    className="text-green-400 text-sm font-semibold font-mono"
                    href={post.URL}
                  >
                    {post.URL.slice(post.URL.indexOf("://") + 3)}
                  </a>
                </div>
              )}
              {post?.URL && section === "Marketplaces" && (
                <div className="flex flex-col">
                  <p className="font-bold text-wall-400">Accepts</p>
                  <p className="text-sm font-semibold font-mono">
                    {post.payment.join(", ")}
                  </p>
                </div>
              )}
            </div>
            {post?.URL && section === "Podcasts" && (
              <a
                href={post.URL}
                className="button-lg bg-green-400 text-white cursor-pointer flex space-x-2"
              >
                <img src="/images/sound.svg" />
                &nbsp;Listen
              </a>
            )}
          </div>
          <div className="flex">
            <div className="markdown w-full">
              <Markdown.render content={JSON.parse(markdown)} />
              {children}
            </div>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
