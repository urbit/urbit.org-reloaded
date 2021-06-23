import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import classnames from "classnames";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import BackgroundImage from "../components/BackgroundImage";
import TabCarousel from "../components/TabCarousel";
import {
  getAllPosts,
  formatDate,
  getGrantsCategories,
  getGrantsTypes,
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

export default function Grants({ posts, categories, types }) {
  const [activeTags, setTags] = useState([]);
  const [activeTypes, setTypes] = useState(types);
  const [tab, setTab] = useState(0);

  return (
    <Container>
      <SingleColumn>
        <Header />
        <section className="layout-wide">
          <div className="measure">
            <h2 className="pb-16">Urbit Grants</h2>
            <p className="">
              Urbit is a community project. While anyone can contribute, we help
              focus development and reward exceptional contribution through our
              grants program.
            </p>
          </div>
        </section>
        <section className="layout-wide">
          <div className="flex items-center measure pb-12">
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
            <button
              onClick={() => {
                setTab(1);
                setTypes(["propsals"]);
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
                setTypes(["bounties"]);
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
                setTypes(["apprenticeships"]);
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
                setTypes(["gifts"]);
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

          {posts
            .reduce((acc, post) => {
              // Posts are returned if they match both the selected category and selected tags, or if the user has no category filters set.
              const itemDidPass =
                (post.taxonomies.grant_category.some((r) =>
                  activeTags.includes(r)
                ) ||
                  activeTags.length === 0) &&
                post.taxonomies.grant_type.some((r) => activeTypes.includes(r));
              // Return the item if the above check has passed
              if (itemDidPass === true) {
                return [...acc, post];
              }
              return acc;
            }, [])
            .map((post) => {
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

  return {
    props: { posts: posts, categories, types },
  };
}
