import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Container from "../components/Container";
import Search from "../components/Search";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import BackgroundImage from "../components/BackgroundImage";
import { getAllPosts, formatDate } from "../lib/lib";

export default function Blog({ posts }) {
  const [showSearch, toggleSearch] = useState(false);
  return (
    <Container toggleSearch={() => toggleSearch((state) => !state)}>
      {showSearch && <Search toggleSearch={() => toggleSearch(false)} />}
      <SingleColumn>
        <Header toggleSearch={() => toggleSearch(true)} />
        <section className="layout-wide">
          <div className="measure">
            <h2 className="pb-16">FAQ</h2>
            <p className="pb-6">
              Stories from the broader Urbit community, the Urbit Foundation,
              and the many people contributing to Urbit.
            </p>
            <p>
              Subscribe to the Urbit Newsletter for regular updates, including
              new blog posts and events.
            </p>
          </div>
        </section>
        <section className="layout-wide">
          {posts.map((post) => {
            return (
              <div key={post.slug} className="mb-24 cursor-pointer">
                <Link href={`/blog/${post.slug}`}>
                  <div>
                    {
                      // Not all blog posts have images
                      post.extra.image ? (
                        <BackgroundImage
                          src={post.extra.image}
                          style={{ height: "720px" }}
                          className="w-full rounded-lg"
                        />
                      ) : null
                    }
                    <h2 className="mt-4">{post.title}</h2>
                    <div className="flex items-baseline">
                      {post.extra.author ? (
                        <div className="type-ui text-gray mt-4">
                          {post.extra.author}
                        </div>
                      ) : null}
                      {post.extra.author && post.extra.ship ? (
                        <div className="mx-1 text-gray">•</div>
                      ) : null}
                      {post.extra.ship ? (
                        <div className="type-ui text-gray font-mono">
                          {post.extra.ship}
                        </div>
                      ) : null}
                    </div>

                    <div className="type-ui text-gray mt-2">
                      {formatDate(new Date(post.date))}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra"],
    "blog"
  );

  return {
    props: { posts },
  };
}
