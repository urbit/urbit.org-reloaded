import Head from "next/head";
import Link from "next/link";
import { getPage } from "../../lib/lib";
import { join } from "path";
import Meta from "../../components/Meta";
import CopyLink from "../../components/CopyLink";
import Container from "../../components/Container";
import SingleColumn from "../../components/SingleColumn";
import ErrorPage from "../404";
import Section from "../../components/Section";
import ob from "urbit-ob";
import { decode } from "html-entities";
import Markdown from "../../components/Markdown";

const GroupPage = ({ data, markdown, params }) => {
  const { group } = params;
  if (!ob.isValidPatp(group[0])) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>{data.title} • Groups • urbit.org</title>
        {Meta(data)}
      </Head>
      <SingleColumn>
        <Section className="space-y-12" narrow>
          <div className="flex items-center space-x-4">
            {/* Group logo and fallback */}
            {data.image ? (
              <img
                className="rounded-xl"
                src={data.image}
                height={100}
                width={100}
              />
            ) : (
              <img
                className="object-contain shadow-sm rounded-xl"
                style={{ height: 100, width: 100 }}
                src="https://media.urbit.org/logo/urbit-logo-card.png"
              />
            )}
            <div className="flex flex-col">
              <h2>{data.title}</h2>
              <p>Urbit Group</p>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col basis-1/2 md:basis-auto mb-4 md:mb-0">
              <p className="font-bold text-wall-400">Group Type</p>
              <p>{data.type ? data.type : "Unknown"}</p>
            </div>
            <div className="flex flex-col basis-1/2 md:basis-auto mb-4 md:mb-0">
              <p className="font-bold text-wall-400">Members</p>
              <p>
                {data.participant_range ? data.participant_range : "Unknown"}
              </p>
            </div>
            <div className="flex flex-col basis-1/2 md:basis-auto">
              <p className="font-bold text-wall-400">Host</p>
              <Link href={`/id/${group[0]}`}>
                <a className="type-ui font-mono text-green-400">{group[0]}</a>
              </Link>
            </div>
            <CopyLink
              className="basis-1/2 md:basis-auto"
              content={data.shortcode ? data.shortcode : data.title}
            />
          </div>
          {(data.description !== "A group on Urbit." || markdown) && (
            <div className="flex flex-col space-y-4">
              <p className="font-bold text-wall-400">Description</p>
              {markdown ? (
                <div
                  className="flex flex-col space-y-4"
                  dangerouslySetInnerHTML={{ __html: decode(markdown) }}
                />
              ) : (
                <p>{data.description}</p>
              )}
            </div>
          )}
          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-6">
            <h3>
              Urbit is a clean-slate, peer-to-peer operating system and network.
            </h3>
            <div className="flex flex-col space-y-4">
              <p className="text-sm font-semibold text-wall-400">
                Get on the network and join this group.
              </p>
              {/* TODO: Joining groups guide. */}
              <button className="button-lg max-w-xs bg-green-400 text-white">
                How to join a group
              </button>
            </div>
          </div>
          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-1">
            <p>Have a group you'd like to share publicly through urbit.org?</p>
            {/* TODO Submission guide. */}
            <p className="type-ui text-green-400">
              Learn how to submit your group.
            </p>
          </div>
          <Link href="/">
            <a className="text-xl pt-8 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
};

export const getServerSideProps = async ({ params }) => {
  let { data, content } = getPage(
    join(process.cwd(), "content/group", params.group?.join("/") || "/")
  ) || { data: {}, content: "" };

  if (!data.title) {
    data = { title: params.group?.join("/"), description: "A group on Urbit." };
  }

  const markdown = await Markdown({ post: { content: content } }, true);

  return {
    props: {
      data,
      markdown,
      params,
    },
  };
};

export default GroupPage;
