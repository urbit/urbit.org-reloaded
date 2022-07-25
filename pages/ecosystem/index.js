// All sections in one template
// Grid-columns-three
// Get content from content/ecosystem/spotlight, content/applications, content/marketplaces, content/organizations, content/podcasts, content/groups
import { useRouter } from "next/router";
import Head from "next/head";
import Meta from "../../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
  Markdown,
} from "foundation-design-system";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Post from "../../components/ecosystem/Post";
import classnames from "classnames";
import Link from "next/link";
import { getAllPosts } from "../../lib/lib";
import fs from "fs";
import path from "path";
import Contact from "../../components/Contact";
import { generateDisplayDate, formatDate } from "../../lib/lib";

export default function Ecosystem({
  search,
  post,
  posts,
  applications,
  marketplaces,
  organizations,
  podcasts,
}) {
  const router = useRouter();

  const { type } = router.query;

  if (type === "archive") {
    return <SpotlightArchive posts={posts} search={search} />;
  }

  let title;
  if (type) {
    switch (type) {
      case "applications":
        title = "Applications";
        break;
      case "marketplaces":
        title = "Marketplaces";
        break;
      case "podcasts":
        title = "Podcasts";
        break;
      case "organizations":
        title = "Organizations";
        break;
      default:
        title = "Spotlight";
    }
  } else {
    title = "Spotlight";
  }

  const data = {
    title: title,
    description: "Explore the Urbit ecosystem.",
  };
  return (
    <Container>
      <Head>
        <title>{title} • Urbit</title>
        {Meta(data)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section>
          <h1>Ecosystem</h1>
        </Section>
        <Section className="justify-center">
          <div className="flex justify-between sidebar">
            <Sidebar>
              <EcosystemSidebar />
            </Sidebar>
            <div
              className={classnames("w-full", {
                "max-w-prose": type === undefined,
              })}
            >
              {type === undefined && (
                <h3>{`Ecosystem Spotlight - ${post.title}`}</h3>
              )}
              {type === undefined && (
                <>
                  <Post post={post} />
                  <Link href="/ecosystem/?type=archive" passHref>
                    <a className="button-lg bg-wall-600 text-white w-fit">
                      Spotlight Archive
                    </a>
                  </Link>

                  <div className="pt-36">
                    <h3 className="pb-2">Urbit Monthly</h3>
                    <p className="pb-8">
                      Get the Spotlight in your inbox along with updates on
                      everything Urbit.
                    </p>
                    <Contact emphasize className="w-full" />
                  </div>
                </>
              )}
              <div
                className={classnames("grid gap-12 w-full", {
                  "grid-cols-2 md:grid-cols-3": type !== "podcasts",
                  "grid-cols-1": type === "podcasts",
                  "grid-cols-1 md:grid-cols-1": type === "applications",
                  hidden: type === undefined,
                })}
              >
                {type === "organizations" &&
                  organizations.map((org) => (
                    <Link href={`/organizations/${org.slug}`}>
                      <div className="flex flex-col space-y-4 justify-center items-center cursor-pointer hover:opacity-90">
                        <img className="w-36" src={org.image} />
                        <p className="text-center font-bold">{org.title}</p>
                      </div>
                    </Link>
                  ))}
                {type === "applications" &&
                  applications.map((app) => (
                    <Link href={`/applications/${app.ship}/${app.slug}`}>
                      <div className="flex space-x-4 items-center cursor-pointer hover:opacity-90">
                        <div
                          className="h-36 w-36 rounded-xl items-center justify-center"
                          style={{
                            backgroundColor: app?.bgColor || "rgba(0,0,0,0)",
                          }}
                        >
                          {app?.image && (
                            <img className="items-center" src={app.image} />
                          )}
                        </div>
                        <div className="">
                          <p className="text-left font-bold">{app.title}</p>
                          <p className="text-left text-wall-400 font-light">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                {type === "marketplaces" &&
                  marketplaces.map((market) => (
                    <Link href={`/marketplaces/${market.slug}`}>
                      <div className="flex flex-col space-y-4 justify-center items-center cursor-pointer hover:opacity-90">
                        <img className="w-36" src={market.image} />
                        <p className="text-center font-bold">{market.title}</p>
                      </div>
                    </Link>
                  ))}
                {type === "podcasts" &&
                  podcasts.map((pod) => (
                    <Link href={`/podcasts/${pod.slug}`}>
                      <div className="flex cursor-pointer space-x-4 items-center hover:opacity-90">
                        <img className="w-28" src={pod.image} />
                        <div className="flex flex-col space-y-2 min-w-0">
                          <p className="font-bold">{pod.podcast}</p>
                          <p className="min-w-0 min-h-0 leading-5 ">
                            {pod.title}
                          </p>
                          <p className="text-wall-400">
                            {formatDate(generateDisplayDate(pod.date))}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

function ActiveLink({ children, href, className, currentPath }) {
  // special casing this behaviour which overloads one nav
  const archive = Boolean(
    currentPath === "/ecosystem?type=archive" && href === "/ecosystem"
  );
  const activeClassName = classnames({
    "text-wall-800": currentPath === href || archive,
    "text-wall-400": currentPath !== href && !archive,
  });

  return (
    <Link href={href} passHref>
      <a className={`${className} ${activeClassName}`}>{children}</a>
    </Link>
  );
}

function EcosystemSidebar() {
  const router = useRouter();
  let currentPath = router.asPath;
  return (
    <div className="flex flex-col space-y-4 pr-24">
      <ActiveLink
        currentPath={currentPath}
        className="type-ui"
        href="/ecosystem"
      >
        Spotlight
      </ActiveLink>
      <ActiveLink
        currentPath={currentPath}
        className="type-ui"
        href="/ecosystem?type=organizations"
      >
        Organizations
      </ActiveLink>
      <ActiveLink
        currentPath={currentPath}
        className="type-ui"
        href="/ecosystem?type=applications"
      >
        Applications
      </ActiveLink>
      <ActiveLink
        currentPath={currentPath}
        className="type-ui"
        href="/ecosystem?type=marketplaces"
      >
        Marketplaces
      </ActiveLink>
      <ActiveLink
        currentPath={currentPath}
        className="mr-5 type-ui"
        href="/ecosystem?type=podcasts"
      >
        Podcasts
      </ActiveLink>
    </div>
  );
}

function SpotlightArchive({ posts, search }) {
  const post = {
    title: "Spotlight Archive",
    description: "The archive of ecosystem spotlights.",
  };
  return (
    <Container>
      <Head>
        <title>Archive • Spotlight • Urbit</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section>
          <div className="measure">
            <h1>Ecosystem</h1>
          </div>
        </Section>
        <Section className="flex">
          <Sidebar>
            <EcosystemSidebar />
          </Sidebar>
          <div>
            <h3 className="mb-12">Spotlight Archive</h3>
            {posts.map((post) => {
              return (
                <div key={post.slug} className="mb-24 cursor-pointer">
                  <Link href={`/ecosystem/spotlight/${post.slug}`}>
                    <div>
                      <h3 className="text-green-400">{post.title}</h3>
                      <div className="type-ui mt-2">
                        {["featured-1", "featured-2", "featured-3"].map(
                          (feat, i) => {
                            if (post?.[feat]) {
                              return (
                                <>
                                  {i ? ", " : ""}
                                  <span>{post[feat].title}</span>
                                </>
                              );
                            }
                          }
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({}) {
  const posts = getAllPosts(
    ["title", "date", "slug", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight",
    "date"
  );
  let post = getAllPosts(
    ["title", "date", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight",
    "date"
  )[0];
  ["featured-1", "featured-2", "featured-3"].forEach((feat) => {
    if (post?.[feat]) {
      post[feat].content = JSON.stringify(
        Markdown.parse({
          post: { content: post[feat].content },
        })
      );
    }
  });
  const marketplaces = getAllPosts(["title", "image", "slug"], "marketplaces");
  const podcasts = getAllPosts(
    ["title", "image", "date", "podcast", "slug"],
    "podcasts",
    "date"
  );
  const organizations = getAllPosts(
    ["title", "image", "slug"],
    "organizations"
  );
  const applications = fs
    .readdirSync(path.join(process.cwd(), "content/applications"), {
      withFileTypes: true,
    })
    .filter((f) => f.isDirectory())
    .map((dir) =>
      getAllPosts(
        ["title", "bgColor", "image", "slug", "description"],
        `applications/${dir.name}`
      )
        .map((e) => ({ ...e, ship: dir.name }))
        .flat()
    )
    .flat()
    .sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return nameA < nameB ? -1 : 1;
    });

  return {
    props: { posts, post, applications, marketplaces, podcasts, organizations },
  };
}
