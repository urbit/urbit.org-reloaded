import Head from "next/head";
import Meta from "../components/Meta";
import Link from "next/link";
import { useState } from "react";
import classnames from "classnames";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import Section from "../components/Section";
import PostPreview from "../components/PostPreview";
import GrantPreview from "../components/GrantPreview";
import {
  getAllPosts,
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
  gifts,
}) {
  const [activeTags, setTags] = useState([]);
  const [activeTypes, setTypes] = useState(types);
  const [includeCompleted, setIncludeCompleted] = useState(false);
  const [tab, setTab] = useState(0);
  const post = {
    title: "Grants",
    description: "Contribute to the Urbit project while earning address space.",
  };

  const postsByCompletion = posts.filter((post) => {
    return includeCompleted
      ? true
      : !post.extra.completed && post.extra.assignee === "";
  });

  const filteredPosts = postsByCompletion.filter((post) => {
    // Posts are returned if they match both the selected category and selected tags, or if the user has no category filters set.
    const hasCategory = post.taxonomies.grant_category.some((category) =>
      activeTags.includes(category)
    );
    const noTagsSelected = activeTags.length === 0;
    const hasType = post.taxonomies.grant_type.some((type) =>
      activeTypes.includes(type)
    );

    return (hasCategory || noTagsSelected) && hasType;
  });

  const allCount = postsByCompletion.length;

  const counts = {
    Bounty: postsByCompletion.filter((post) =>
      post.taxonomies.grant_type.includes("Bounty")
    ).length,
    Apprenticeship: postsByCompletion.filter((post) =>
      post.taxonomies.grant_type.includes("Apprenticeship")
    ).length,
    Proposal: postsByCompletion.filter((post) =>
      post.taxonomies.grant_type.includes("Proposal")
    ).length,
  };

  return (
    <Container>
      <Head>
        <title>Grants • urbit.org</title>
        {Meta(post)}
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
          <div className="pb-16">
            <h2 className="pb-16">Gifts</h2>
            <p className="mb-8">
              Gifts are given post-facto for exceptional contributions.
            </p>
            <div className="flex flex-wrap">
              <PostPreview
                post={gifts[0]}
                className={`w-full md:w-1/2 pr-0 pb-8 md:pr-4`}
                key={gifts[0].slug}
                section={gifts[0].section}
              />
              <PostPreview
                post={gifts[1]}
                className={`w-full md:w-1/2 pl-0 pb-8 md:pl-4`}
                key={gifts[1].slug}
                section={gifts[1].section}
              />
              <PostPreview
                post={gifts[2]}
                className={`w-full md:w-1/2 pr-0 pb-8 md:pr-4`}
                key={gifts[2].slug}
                section={gifts[2].section}
              />
              <PostPreview
                post={gifts[3]}
                className={`w-full md:w-1/2 pl-0 pb-8 md:pl-4`}
                key={gifts[3].slug}
                section={gifts[3].section}
              />
            </div>
          </div>
        </Section>
        {
          // Find a Grant
        }
        <Section wide>
          <h2 id="find-a-grant" className="pb-8">
            Find A Grant
          </h2>
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
              All <div className="opacity-50 ml-2">{allCount}</div>
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
                  {type} <div className="opacity-50 ml-2">{counts[type]}</div>
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
            <div className="pb-8 flex items-center">
              <button
                className="mr-4 badge-sm bg-black text-white"
                onClick={() => setIncludeCompleted(!includeCompleted)}
              >
                {includeCompleted ? "Exclude Completed" : "Include Completed"}
              </button>

              <h4>
                Showing {filteredPosts.length} grant
                {filteredPosts.length === 1 ? "" : "s"}
              </h4>
            </div>
          }
          {filteredPosts.map((post) => {
            return <GrantPreview grant={post} />;
          })}
        </Section>
        {/* Submit a proposal */}
        <Section wide>
          <h2 className="mb-16">Proposals</h2>
          <p className="mb-8">
            Contributors are also welcome to have their personal projects
            considered as a proposal. If you'd like to propose a project for the
            grants program, review our{" "}
            <a href="/grant-submission-guide">submission guide</a>, and feel
            free to submit your proposal{" "}
            <a href="https://github.com/urbit/urbit.org/new/master?filename=/content/grants/project_name.md&value=%2B%2B%2B%0Atitle%20%3D%20%22%22%0Adate%20%3D%202021-01-01%0A%5Btaxonomies%5D%0Agrant_type%20%3D%20%5B%22Proposal%22%5D%0Agrant_category%20%3D%20%5B%22%22%5D%0A%5Bextra%5D%0Aimage%20%3D%20%22%22%0Adescription%20%3D%20%22%22%0Areward%20%3D%201%0Aassignee%20%3D%20%22nartes-fasrum%22%0Aid%20%3D%20%22636838408%22%0Acompleted%20%3D%20false%0Alink%20%3D%20%22%22%0A%2B%2B%2B%0A%0A%5BDescribe%20your%20project%20here.%5D%0A%0A%23%23%20Milestones%0A%0A%5BSeparate%20milestones%20for%20work%20here%20and%20proposed%20payment%20at%20each%20step.%5D">
              using GitHub
            </a>
            .
          </p>
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
  let gifts = getAllPosts(
    ["title", "slug", "date", "description", "extra", "taxonomies"],
    "blog"
  );
  gifts.map((e) => (e.section = "blog"));
  let updates = getAllPosts(
    ["title", "slug", "date", "description", "extra", "taxonomies"],
    "updates"
  );
  updates.map((e) => (e.section = "updates"));
  gifts.push(...updates);
  gifts = gifts
    .filter((e) => e?.taxonomies?.grant_type?.includes("Gift"))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  // The layout expects exactly 3
  const featuredGrants = [
    "bitcoin-full-node-provider-and-wallet",
    "webrtc-gall-agent-and-external-app",
    "urbian-a-customized-linux-distribution-for-urbit-appliances",
  ].map((slug) =>
    getPostBySlug(slug, ["title", "slug", "date", "extra"], "grants")
  );

  return {
    props: { posts: posts, categories, types, featuredGrants, gifts },
  };
}
