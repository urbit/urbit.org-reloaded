import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import classnames from "classnames";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import SingleColumn from "../components/SingleColumn";
import BackgroundImage from "../components/BackgroundImage";
import TabCarousel from "../components/TabCarousel";
import Section from "../components/Section";
import GrantPreview from "../components/GrantPreview";
import {
  getAllPosts,
  formatDate,
  getGrantsCategories,
  getGrantsTypes,
  getPostBySlug,
} from "../lib/lib";

function addTag(array, tag) {
  return [...array, tag];
}

function removeTag(array, tag) {
  const location = array.indexOf(tag);
  if (location === -1) {
    return array;
  }
  const newArr = [...array];
  newArr.splice(location, 1);
  return newArr;
}

function setAllActive(fullSet) {
  return fullSet;
}

function setAllInactive() {
  return [];
}

function setOneTagOnly(tag) {
  return [tag];
}

function toggleTag(array, tag) {
  if (array.includes(tag)) {
    return removeTag(array, tag);
  } else {
    return addTag(array, tag);
  }
}

function toggleAll(currentArray, fullSet) {
  if (currentArray.length === 0) {
    return setAllActive(fullSet);
  } else {
    return setAllInactive();
  }
}

export default function Grants({
  posts,
  categories,
  types,
  featuredGrants,
  search,
}) {
  const [activeTags, setTags] = useState([]);
  const [activeTypes, setTypes] = useState(types);
  const [includeCompleted, setIncludeCompleted] = useState(false);
  const [tab, setTab] = useState(0);

  const filteredPosts = posts.filter((post) => {
    // Posts are returned if they match both the selected category and selected tags, or if the user has no category filters set.
    const hasCategory = post.taxonomies.grant_category.some((r) =>
      activeTags.includes(r)
    );
    const noTagsSelected = activeTags.length === 0;
    const hasType = post.taxonomies.grant_type.some((r) =>
      activeTypes.includes(r)
    );
    const matchesCompletionFilter = includeCompleted
      ? true
      : post.extra.completed === false;

    return (
      (hasCategory || noTagsSelected) && hasType && matchesCompletionFilter
    );
  });

  return (
    <Container>
      <Head>
        <title>Urbit • Grants</title>
      </Head>
      <SingleColumn>
        <Header search={search} />
        {
          // Heading and introduction
        }
        <Section wide>
          <div className="measure pb-16">
            <h1 className="pb-16">Grants</h1>
            <p className="mb-8">
              Urbit is a community project. While anyone can contribute, we help
              focus development and reward exceptional contribution through our
              grants program.
            </p>
            <p>
              Contributors of all types have access to a wide variety of
              resources while working on projects, including a supportive team
              at urbit.org, Tlon developers, and community mentors.
            </p>
          </div>
          <div className="p-8 bg-wall flex flex-col w-full rounded-lg space-y-4">
            <p>
              <i>
                “I paid off my student loans through the Urbit grants program,
                and had fun doing it!”
              </i>
            </p>
            <p>
              — Urbit Community Member{" "}
              <pre className="ml-6">~radbur-sivmus</pre>
            </p>
          </div>
        </Section>
        {
          // Featured Grants
        }
        <Section wide>
          <div className="measure pb-16">
            <h2 className="pb-16">Featured Grants</h2>
            <p className="mb-8">
              These grants should give you a general idea of what kind of work
              we reward:
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4 space-x-0">
            {featuredGrants.map((grant) => {
              return (
                <Link href={"/grants/" + grant.slug}>
                  <div className="p-8 bg-washedGreen rounded-lg w-full md:w-1/3 cursor-pointer">
                    <h4 className="pb-4">{grant.title}</h4>
                    <p className="text-green pb-4">
                      {grant.extra.reward} star
                      {grant.extra.reward === 1 ? "" : "s"}{" "}
                      {grant.extra.completed ? "awarded" : "pending"}
                    </p>
                    <p>{grant.extra.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>

        {
          // Gift Grants
        }
        <Section wide>
          <div className="measure pb-16">
            <h2 className="pb-16">Gifts</h2>
            <p className="mb-8">
              Gifts are given post facto for exceptional contributions.
            </p>
          </div>
        </Section>
        {
          // Find a Grant
        }
        <Section wide>
          <h2 className="pb-8">Find A Grant</h2>
          <h5 className="text-black font-semibold my-2">Work Programs</h5>
          <div className="flex flex-wrap items-center pb-2">
            <button
              onClick={() => {
                setTab(0);
                setTypes(types);
              }}
              className={`badge-lg my-2 mr-2 ${
                tab === 0 ? "text-white bg-black" : "text-gray bg-wall"
              }`}
            >
              All
            </button>
            {types.map((type, index) => {
              const className = classnames({
                "bg-blue text-white": tab === index + 1 && type === "Proposal",
                "bg-green text-white":
                  tab === index + 1 && type === "Apprenticeship",
                "bg-yellow": tab === index + 1 && type === "Bounty",
                "bg-wall text-gray": tab !== index + 1,
              });
              return (
                <button
                  onClick={() => {
                    // + 1 is added here because the 'all' button precedes this sequence
                    setTab(index + 1);
                    setTypes([type]);
                  }}
                  className={`badge-lg mr-2 ${className}`}
                >
                  {type}
                </button>
              );
            })}
          </div>
          <h5 className="text-black font-semibold my-2">Work Categories</h5>
          <div className="flex flex-wrap mb-12">
            {categories.map((category) => {
              const isActive = activeTags.includes(category);
              const activeClasses = classnames({
                "bg-green text-white": isActive,
                "bg-wall text-gray": !isActive,
              });
              return (
                <button
                  onClick={() => setTags(toggleTag(activeTags, category))}
                  className={`${activeClasses} badge-sm mr-1 my-1`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          {
            <div className="pb-8 flex">
              <h4>
                Showing {filteredPosts.length} grant
                {filteredPosts.length === 1 ? "" : "s"}
              </h4>
              {
                // <button
                //   className="ml-4"
                //   onClick={() => setIncludeCompleted(!includeCompleted)}
                // >
                //   {includeCompleted ? "Exclude Completed" : "Include Completed"}
                // </button>
              }
            </div>
          }
          {filteredPosts.map((post) => {
            return <GrantPreview grant={post} />;
          })}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const categories = getGrantsCategories();
  const types = getGrantsTypes();
  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra", "taxonomies"],
    "grants"
  );

  // The layout expects exactly 3
  const featuredGrants = [
    "bitcoin-full-node-provider-and-wallet",
    "webrtc-gall-agent-and-external-app",
    "urbian-a-customized-linux-distribution-for-urbit-appliances",
  ].map((slug) =>
    getPostBySlug(slug, ["title", "slug", "date", "extra"], "grants")
  );

  return {
    props: { posts: posts, categories, types, featuredGrants },
  };
}
