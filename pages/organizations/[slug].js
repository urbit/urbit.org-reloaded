import BasicPage from "../../components/ecosystem/BasicPage";
import {
  Markdown,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "@urbit/foundation-design-system";
import Link from "next/link";
import fs from "fs";
import path from "path";

export default function Organization({
  post,
  markdown,
  search,
  index,
  groups,
  applications = [],
  spotlights = [],
}) {
  return (
    <BasicPage
      section="Organization"
      post={post}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 h-full w-full">
            {applications.map((app) => (
              <Link href={`/applications/${app.ship}/${app.slug}`}>
                <div className="flex flex-col h-full w-full space-y-4 cursor-pointer">
                  <div
                    className="overflow-hidden rounded-xl w-full"
                    style={{
                      backgroundColor: app.bgColor || "rgba(0,0,0,0)",
                      aspectRatio: "1",
                    }}
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
      {groups.length > 0 && (
        <>
          <h3>Groups</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {groups.map((group) => (
              <Link href={`/groups/${group.ship}/${group.slug}`}>
                <div className="flex flex-col space-y-4 cursor-pointer">
                  {group?.tile?.startsWith("#") ? (
                    <div
                      className="rounded-xl"
                      style={{
                        backgroundColor: group.tile,
                        height: 164,
                        width: 164,
                      }}
                    />
                  ) : (
                    <img
                      src={group.tile}
                      className="h-full w-full rounded-xl"
                    />
                  )}
                  <p className="text-center font-bold font-xl">{group.title}</p>
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
    [
      "title",
      "slug",
      "description",
      "URL",
      "image",
      "ships",
      "group",
      "content",
    ],
    "organizations"
  );

  const spotlights = getAllPosts(
    ["title", "slug", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight"
  ).filter(
    (e) =>
      e?.["featured-1"]?.title === post.title ||
      e?.["featured-2"]?.title === post.title ||
      e?.["featured-3"]?.title === post.title
  );

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

  const groups = post.ships
    .map((ship) => {
      let groups = [];
      if (fs.existsSync(path.join(process.cwd(), "content/groups", ship))) {
        groups = getAllPosts(["title", "tile", "slug"], `groups/${ship}`).map(
          (e) => ({ ...e, ship })
        );
      }
      return groups;
    })
    .flat();

  let { index } = post?.extra || { index: null };

  if (index === undefined) {
    index = null;
  }

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, spotlights, applications, groups, index },
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
