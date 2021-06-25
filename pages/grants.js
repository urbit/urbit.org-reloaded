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

export default function Grants({ posts, categories, types, featuredGrants }) {
  const [activeTags, setTags] = useState([]);
  const [activeTypes, setTypes] = useState(types);
  const [tab, setTab] = useState(0);

  const filteredPosts = posts.reduce((acc, post) => {
    // Posts are returned if they match both the selected category and selected tags, or if the user has no category filters set.
    const itemDidPass =
      (post.taxonomies.grant_category.some((r) => activeTags.includes(r)) ||
        activeTags.length === 0) &&
      post.taxonomies.grant_type.some((r) => activeTypes.includes(r));
    // Return the item if the above check has passed
    if (itemDidPass === true) {
      return [...acc, post];
    }
    return acc;
  }, []);

  return (
    <Container>
      <SingleColumn>
        <Search />
        <Header />
        {
          // Heading and introduction
        }
        <section className="layout-wide">
          <div className="measure pb-16">
            <h2 className="pb-16">Urbit Grants</h2>
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
              — Urbit Community Member <pre>~radbur-sivmus</pre>
            </p>
          </div>
        </section>
        {
          // Featured Grants
        }
        <section className="layout-wide">
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
                <Link href={grant.slug}>
                  <div className="p-8 bg-washedGreen rounded-lg w-full md:w-1/3 cursor-pointer">
                    <h4 className="pb-4">{grant.title}</h4>
                    <p className="text-green pb-4">
                      {grant.extra.reward} star
                      {grant.extra.reward > 1 ? "s" : ""}{" "}
                      {grant.extra.completed ? "awarded" : "pending"}
                    </p>
                    <p>{grant.extra.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        {
          // Find a Grant
        }
        <section className="layout-wide">
          <h2 className="pb-8">Find A Grant</h2>
          <div className="flex items-center measure pb-8">
            <button
              onClick={() => {
                setTab(0);
                setTypes(types);
              }}
              className={`tab-button-sm mr-4 ${
                tab === 0 ? "text-black" : "text-gray"
              }`}
            >
              All
            </button>
            {
              // NB Gavin: These should be auto-generated from the markdown metadata
            }
            <button
              onClick={() => {
                setTab(1);
                setTypes(["Proposal"]);
              }}
              className={`tab-button-sm mr-4 ${
                tab === 1 ? "text-black" : "text-gray"
              }`}
            >
              Proposals
            </button>
            <button
              onClick={() => {
                setTab(2);
                setTypes(["Bounty"]);
              }}
              className={`tab-button-sm mr-4 ${
                tab === 2 ? "text-black" : "text-gray"
              }`}
            >
              Bounties
            </button>
            <button
              onClick={() => {
                setTab(3);
                setTypes(["Apprenticeship"]);
              }}
              className={`tab-button-sm mr-4 ${
                tab === 3 ? "text-black" : "text-gray"
              }`}
            >
              Apprenticeships
            </button>
            <button
              onClick={() => {
                setTab(4);
                setTypes(["Gift"]);
              }}
              className={`tab-button-sm ${
                tab === 4 ? "text-black" : "text-gray"
              }`}
            >
              Gifts
            </button>
          </div>

          <div className="flex flex-wrap mb-12">
            {categories.map((category) => {
              const isActive = activeTags.includes(category);
              const activeClasses = classnames({
                "bg-green text-white": isActive,
                "bg-wall text-black": !isActive,
              });
              return (
                <button
                  onClick={() => setTags(toggleTag(activeTags, category))}
                  className={`${activeClasses} badge-sm m-1`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {
            // <div className="pb-8">
            //   <TabCarousel index={tab}>
            //     <p>All {filteredPosts.length} Urbit grants</p>
            //     <p>{filteredPosts.length} proposals from community members to work on their own projects</p>
            //     <p>{filteredPosts.length} bounties for specific work needed by the Urbit Foundation</p>
            //     <p>{filteredPosts.length} apprenticeships for projects undertaken with a mentor</p>
            //     <p>{filteredPosts.length} gifts given post facto for exceptional contributions</p>
            //   </TabCarousel>
            // </div>
          }

          {filteredPosts.map((post) => {
            return (
              <div
                key={post.slug}
                className="mb-4 cursor-pointer bg-wall rounded-lg"
              >
                <Link href={`/grants/${post.slug}`}>
                  <div className="p-8">
                    <h3 className="type-ui mb-4">{post.title}</h3>
                    <p className="mb-4">{post.extra.description}</p>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-gray">
                        <strong>Reward: </strong>
                        {post.extra.reward} star
                        {post.extra.reward > 1 ? "s" : ""}
                      </p>
                      <div className="flex">
                        {post.taxonomies.grant_type.map((category) => (
                          <div className="bg-black text-wall badge-sm m-1">
                            {category}
                          </div>
                        ))}
                        {post.taxonomies.grant_category.map((category) => (
                          <div className="bg-gray text-wall badge-sm m-1">
                            {category}
                          </div>
                        ))}
                      </div>
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
