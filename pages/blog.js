import Head from "next/head";
import Link from "next/link";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import BackgroundImage from "../components/BackgroundImage";
import Section from "../components/Section";
import { getAllPosts, formatDate } from "../lib/lib";

export default function Blog({ posts, search }) {
  return (
    <Container>
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <div className="measure">
            <h2 className="pb-16">Urbit Blog</h2>
            <p className="pb-6">
              Stories from the broader Urbit community, the Urbit Foundation,
              and the many people contributing to Urbit.
            </p>
            <p>
              Subscribe to the Urbit Newsletter for regular updates, including
              new blog posts and events.
            </p>
          </div>
        </Section>
        <Section narrow>
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
                          style={{ height: "620px" }}
                          className="w-full rounded-lg"
                        />
                      ) : null
                    }
                    <h3 className="mt-4">{post.title}</h3>
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
        </Section>
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
