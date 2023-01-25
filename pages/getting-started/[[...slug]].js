import Head from "next/head";
import Meta from "../../components/Meta";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import { join } from "path";
import { Markdown, getPage } from "@urbit/foundation-design-system";
import ContentArea from "../../components/ContentArea";
import Sidebar from "../../components/DocsSidebar";
import GettingStartedTree from "../../cache/getting-started.json";

export default function UsingLayout({ posts, data, params, search, markdown }) {
  const router = useRouter();

  const select = (href) => {
    const isSelected =
      `/getting-started${href === "" ? "" : `/${href}`}` === router.asPath;
    return classnames({
      dot: isSelected,
      "text-green-400": isSelected,
      "text-wall-500": !isSelected,
    });
  };

  let started = [{ title: "Introduction", slug: "", weight: 0 }],
      around = [],
      selfhost = [],
      hostprov = [];

  posts.pages.map((post) => {
    if (post?.tag === "around") {
      around.push(post);
    } else if (post?.tag === "selfhost") {
      selfhost.push(post);
    } else if (post?.tag === "hostprov") {
      hostprov.push(post);
    } else if (post?.tag === "started") {
      started.push(post);
    }
  });

  started.sort((a, b) => a.weight > b.weight);
  selfhost.sort((a, b) => a.weight > b.weight);
  hostprov.sort((a, b) => a.weight > b.weight);
  around.sort((a, b) => a.weight > b.weight);

  const rootClasses = "pl-0 font-semibold antialiased text-base hover:text-green-400";

  return (
    <>
      <Head>
        <title>{data.title} • Getting Started</title>
        {Meta(data)}
      </Head>
      <div className="flex h-screen min-h-screen w-screen sidebar">
        <Sidebar search={search}>
          <ul>
            {started.map((post) => (
              <li>
                <Link href={post.slug} passHref>
                  <a className={`relative ${select(post.slug)} ${rootClasses}`}>
                    {post.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6">
            <p className="uppercase pb-1 font-bold antialiased text-xs text-wall-400">
              Run Yourself
            </p>
            {selfhost.map((post) => (
              <li>
                <Link href={post.slug} passHref>
                  <a className={`relative ${select(post.slug)} ${rootClasses}`}>
                    {post.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6">
            <p className="uppercase pb-1 font-bold antialiased text-xs text-wall-400">
              Hosting
            </p>
            {hostprov.map((post) => (
              <li>
                <Link href={post.slug} passHref>
                  <a className={`relative ${select(post.slug)} ${rootClasses}`}>
                    {post.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6">
            <p className="uppercase pb-1 font-bold antialiased text-xs text-wall-400">
              Getting Around
            </p>
            {around.map((post) => (
              <li>
                <Link href={post.slug} passHref>
                  <a className={`relative ${select(post.slug)} ${rootClasses}`}>
                    {post.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title={data.title}
          description={data.description}
          search={search}
          section={"Getting Started"}
          params={params}
          disableToC
        >
          <div className="markdown">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
          {/* {!params?.slug && <LaunchCards />} */}
        </ContentArea>
      </div>
    </>
  );
}

const breadcrumbs = (posts, paths) => {
  const results = [
    <Link href="/getting-started">Getting Started</Link>
  ];
  let thisLink = "/getting-started";
  for (const path of paths) {
    posts = posts.children[path];
    thisLink = join(thisLink, path);
    results.push(
      <span className="px-1">/</span>,
      <Link href={thisLink}>{posts.title}</Link>
    );
  }
  return results;
};

// function LaunchCards() {
//   const info = [
//     {
//       title: "Hosted urbit",
//       subtitle: "Deploy Urbit on a managed service",
//       points: [
//         {
//           title: "Benefits",
//           content: [
//             "Accessibility from anywhere",
//             "Streamlined setup for ownership and identity",
//             "No technical proficiency required",
//           ],
//         },
//         {
//           title: "Considerations",
//           content: [
//             "Requires monthly subscription",
//             "Requires trust in your service provider",
//           ],
//         },
//       ],
//       svg: (
//         <svg
//           width="50"
//           height="50"
//           viewBox="0 0 50 50"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect width="50" height="23.1481" rx="10" className="fill-wall-600" />
//           <rect
//             y="26.8519"
//             width="50"
//             height="23.1481"
//             rx="10"
//             className="fill-wall-600"
//           />
//           <ellipse
//             cx="40.4167"
//             cy="11.5741"
//             rx="2.91667"
//             ry="3.24074"
//             className="fill-white"
//           />
//           <ellipse
//             cx="40.4167"
//             cy="38.4259"
//             rx="2.91667"
//             ry="3.24074"
//             className="fill-white"
//           />
//         </svg>
//       ),
//       href: "/getting-started/hosted",
//     },
//     {
//       title: "Command line app",
//       subtitle: "Run Urbit from the terminal",
//       points: [
//         {
//           title: "Benefits",
//           content: ["Greater control", "Reliable", "Smaller footprint"],
//         },
//         {
//           title: "Considerations",
//           content: ["Requires familiarity with the command line"],
//         },
//       ],
//       svg: (
//         <svg
//           width="55"
//           height="55"
//           viewBox="0 0 66 50"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill-rule="evenodd"
//             clip-rule="evenodd"
//             d="M52.9288 0.03125H3.07125C1.39393 0.03125 0.03125 1.39393 0.03125 3.07125V52.9288C0.03125 53.7333 0.351879 54.5081 0.921894 55.0781C1.49191 55.6481 2.26671 55.9688 3.07125 55.9688H52.9288C53.7333 55.9688 54.5081 55.6481 55.0781 55.0781C55.6481 54.5081 55.9688 53.7333 55.9688 52.9288V3.07125C55.9688 2.26671 55.6481 1.49189 55.0781 0.921894C54.5081 0.351894 53.7333 0.03125 52.9288 0.03125V0.03125ZM12.8 38.7912L20.78 30.7368L12.8 22.7568L17.1314 18.4254L27.2402 28.6079C27.8191 29.1779 28.1456 29.9586 28.1456 30.7721C28.1456 31.5885 27.8191 32.3693 27.2402 32.9393L17.0577 43.0481L12.8 38.7912ZM38.9425 43.1226H27.0113V37.0426H38.8688L38.9425 43.1226Z"
//             className="fill-wall-600"
//           />
//         </svg>
//       ),
//       href: "/getting-started/cli",
//     }
//   ];
//   return (
//     <div className="flex flex-col space-y-8 mt-8">
//       {info.map((e) => {
//         return (
//           <div className="p-8 bg-wall-100 rounded-xl max-w-screen-md flex flex-col">
//             <div className="flex">
//               <div className="pl-4 pr-8 justify-center items-center flex">
//                 {e.svg}
//               </div>
//               <div className="flex flex-col">
//                 <h4 className="text-2xl">{e.title}</h4>
//                 <p className="font-light text-lg">{e.subtitle}</p>
//               </div>
//             </div>
//             <div className="flex mt-8 border-b-neutral-300 pt-2 pb-5 ">
//               {e.points.map((section) => {
//                 return (
//                   <div className="basis-1/2">
//                     <p className="uppercase font-bold text-sm text-black">
//                       {section.title}
//                     </p>
//                     <ul className="mx-8 my-2 list-disc text-sm flex flex-col space-y-2">
//                       {section.content.map((point) => (
//                         <li>{point}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 );
//               })}
//             </div>
//             <Link href={e.href} passHref>
//               <a className="button-lg max-w-fit text-white mt-4 bg-green-400">
//                 Get Started
//               </a>
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export async function getStaticProps({ params }) {
  let posts = GettingStartedTree;

  const { data, content } = getPage(
    join(
      process.cwd(),
      "content/getting-started",
      params.slug?.join("/") || "/"
    )
  );

  const markdown = JSON.stringify(Markdown.parse({ post: { content } }));

  return { props: { posts, data, markdown, params } };
}

export async function getStaticPaths() {
  const posts = GettingStartedTree;

  const slugs = [];

  const allHrefs = (thisLink, tree) => {
    slugs.push(thisLink, ...tree.pages.map((e) => join(thisLink, e.slug)));
    allHrefsChildren(thisLink, tree.children);
  };

  const allHrefsChildren = (thisLink, children) => {
    Object.entries(children).map(([childSlug, child]) => {
      allHrefs(join(thisLink, childSlug), child);
    });
  };

  allHrefs("/getting-started", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
