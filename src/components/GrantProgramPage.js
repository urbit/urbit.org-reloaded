import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  Container,
  Main,
  Section,
  Markdown,
  formatDate,
  generateDisplayDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import ErrorPage from "@/pages/404";

function FaqSection({ q, a }) {
  const [expand, setExpand] = useState(false);
  return (
    <div onClick={() => setExpand(!expand)}>
      <Section className={`py-1${expand ? " mb-1.5" : ""}`}>
        <h3 className="h3 flex justify-between">
          {q} <span>{expand ? "↑" : "↓"}</span>
        </h3>
        {expand && <p className="body-md mb-1.5">{a}</p>}
      </Section>
      <hr className="hr-horizontal border-primary" />
    </div>
  );
}

export default function GrantProgramPage({
  post,
  markdown,
  program,
  links,
  faq,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  const title = program.charAt(0).toUpperCase() + program.slice(1);
  return (
    <Container>
      <Head>
        <title>{title} • Grants • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main className="text-primary" responsiveSpace singleColumn>
        <h1 className="h1 mt-12 md:mt-16">{post.title}</h1>
        <p className="body-md text-tertiary">
          Last Revision:{" "}
          <span className="text-primary">
            {formatDate(generateDisplayDate(post.date))}
          </span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {links.map(({ label, url }) => {
            return (
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-md w-fit"
                href={url}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <hr className="hr-horizontal border-primary" />
        <section className="markdown layout-narrow">
          <Markdown.render content={JSON.parse(markdown)} />
        </section>
        {faq && (
          <Section>
            <h1 className="h1">FAQ</h1>
            <div className="w-full">
              <hr className="hr-horizontal border-primary" />
              {faq.map((props) => (
                <FaqSection {...props} />
              ))}
            </div>
          </Section>
        )}
      </Main>
      <Footer />
    </Container>
  );
}
