import Head from "next/head";
import Meta from "../components/Meta";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import { EventCard } from "./events";
import Section from "../components/Section";
import { getAllPosts } from "../lib/lib";

export default function Media({ posts, search }) {
  const post = {
    title: "Media",
    description:
      "A selection of external appearances by the Tlon Corporation and the Urbit Foundation.",
  };
  return (
    <Container>
      <Head>
        <title>Media • urbit.org</title>
        {Meta(post)}
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <div className="measure">
            <h1 className="pb-16">Media</h1>
            <p className="pb-6">
              Selected external media appearances from Tlon and the Urbit
              Foundation.
            </p>
          </div>
        </Section>
        <Section narrow>
          {posts.map((post) => {
            return <EventCard event={post} dir="/media/" />;
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
    "media"
  );

  return {
    props: { posts },
  };
}
