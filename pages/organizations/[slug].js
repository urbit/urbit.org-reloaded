// Single page per organisation
// Needs to have *associated ships* by which it polls content/applications for applications it "owns"
// Needs to look for its title in ecosystem/spotlight
import { getAllPosts, getPostBySlug, getPostSlugs } from "../../lib/lib";
import BasicPage from "../../components/ecosystem/BasicPage";
import { Markdown } from "foundation-design-system";
import Link from "next/link";
import fs from "fs";
import path from "path";

export default function Organization({
  post,
  markdown,
  search,
  index,
  group,
  applications = [],
  spotlights = [],
}) {
  return (
    <BasicPage
      section="Organizations"
      post={post}
      group={group}
      markdown={markdown}
      search={search}
      index={index}
    >
      {spotlights.length > 0 && (
        <p>
          Featured in{" "}
          {spotlights.map((e, i) => (
            <>
              {i ? ", " : ""}
              <Link href={`/ecosystem/spotlight/${e.slug}`}>{e.title}</Link>
            </>
          ))}
        </p>
      )}
      {applications.length > 0 && (
        <>
          <h3>Applications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {applications.map((app) => (
              <Link href={`/applications/${app.ship}/${app.slug}`}>
                <div className="flex flex-col space-y-4 cursor-pointer">
                  <div
                    className="overflow-hidden rounded-xl"
                    style={{ backgroundColor: app.bgColor || "rgba(0,0,0,0)" }}
                  >
                    {app.image && (
                      <img src={app.image} className="h-full w-full" />
                    )}
                  </div>
                  <p className="text-center font-bold font-xl">{app.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </BasicPage>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "URL", "image", "ships", "group", "content"],
    "organizations"
  );

  const spotlights = getAllPosts(
    ["title", "slug", "featured"],
    "ecosystem/spotlight"
  ).filter((e) => e.featured.includes(post.title));

  const applications = post.ships
    .map((ship) => {
      let apps = [];
      if (
        fs.existsSync(path.join(process.cwd(), "content/applications", ship))
      ) {
        apps = getAllPosts(
          ["title", "image", "bgColor", "slug"],
          `applications/${ship}`
        ).map((e) => ({ ...e, ship }));
      }
      return apps;
    })
    .flat();

  let group = null;
  const groupHost = post?.group?.slice(0, post.group.indexOf("/"));
  const groupName = post?.group?.slice(post.group.indexOf("/"));
  if (
    post.group &&
    fs.existsSync(path.join(process.cwd(), "content/groups", groupHost)) &&
    fs.existsSync(
      path.join(process.cwd(), "content/groups", groupHost, `${groupName}.md`)
    )
  ) {
    group = getPostBySlug(groupName, ["title"], `groups/${groupHost}`);
  }
  let { index } = post?.extra || { index: null };

  if (index === undefined) {
    index = null;
  }

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, spotlights, applications, group, index },
  };
}

export async function getStaticPaths() {
  const posts = getPostSlugs("organizations");

  const slugs = posts.map((e) => e.slice(0, -3));

  return {
    paths: slugs.map((post) => {
      return {
        params: {
          slug: post,
        },
      };
    }),
    fallback: false,
  };
}
