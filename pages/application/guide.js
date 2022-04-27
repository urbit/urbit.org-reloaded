import Head from "next/head";
import Link from "next/link";
import { getPostBySlug } from "../../lib/lib";
import Meta from "../../components/Meta";
import Markdown from "../../components/Markdown";
import Container from "../../components/Container";
import SingleColumn from "../../components/SingleColumn";
import Section from "../../components/Section";
import { decode } from "html-entities";

export default function GuidePage({ post, markdown }) {
  return (
    <Container>
      <Head>
        <title>Urbit • {post.title}</title>
        {Meta(post)}
      </Head>
      <SingleColumn>
        <Section narrow>
          <h2>{post.title}</h2>
        </Section>
        <Section narrow>
          <article
            className="markdown"
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
          <h2 className="text-3xl my-12">5. Add more applications</h2>
          <p className="my-2">Here's a few more applications to check out:</p>
          <Link href="/application/~paldev/pals">
            <div class="bg-wall-200 rounded-xl p-3 flex flex-col space-y-4 my-6 cursor-pointer">
              <div class="flex space-x-4 items-center">
                <div
                  class="rounded-xl"
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: "#A6D2BE",
                  }}
                ></div>
                <h3>pals</h3>
              </div>
              <p>add people you know on the network</p>
            </div>
          </Link>

          <Link href="/application/~fabnev-himnur/escape">
            <div class="bg-wall-200 rounded-xl p-3 flex flex-col space-y-4 my-6 cursor-pointer">
              <div class="flex space-x-4 items-center">
                <img
                  src="https://media.urbit.org/site/application/escape.png"
                  style={{ height: 100, width: 100 }}
                />
                <h3>EScape</h3>
              </div>
              <p>
                an alternative interface for the Groups application, with pals
                integration by{" "}
                <span className="text-green-400 font-mono">~fabnev-hinmur</span>
              </p>
            </div>
          </Link>

          <Link href="/application/~paldev/rumors">
            <div class="bg-wall-200 rounded-xl p-3 flex flex-col space-y-4 cursor-pointer">
              <div class="flex space-x-4 items-center">
                <div
                  class="rounded-xl"
                  style={{
                    backgroundColor: "#B17AD7",
                    height: 100,
                    width: 100,
                  }}
                ></div>
                <h3>rumors</h3>
              </div>
              <p>the more people you know, the more rumors you’ll hear</p>
            </div>
          </Link>
          <Link href="/">
            <a className="text-xl pt-12 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    "guide",
    ["title", "slug", "content"],
    "application"
  );

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown },
  };
}
