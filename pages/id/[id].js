import Head from "next/head";
import Link from "next/link";
import { getPage } from "../../lib/lib";
import { join } from "path";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import SingleColumn from "../../components/SingleColumn";
import ErrorPage from "../404";
import Section from "../../components/Section";
import ob from "urbit-ob";
import { decode } from "html-entities";
import Markdown from "../../components/Markdown";
import Sigil from "../../components/Sigil";
import axios from "axios";
import useSWR from "swr";

const IdPage = ({ data, markdown, network, params }) => {
  const { id } = params;
  if (!ob.isValidPatp(id)) {
    return <ErrorPage />;
  }

  const parent = network ? network.sponsor["urbit-id"] : ob.sein(id);
  const galaxy =
    ob.clan(id) === "planet"
      ? network?.sponsor?.sponsor?.["urbit-id"] || ob.sein(parent)
      : null;

  return (
    <Container>
      <Head>
        <title>{id} • Urbit ID • urbit.org</title>
        {Meta(data)}
      </Head>
      <SingleColumn>
        <Section className="space-y-12" narrow>
          <div className="flex items-center space-x-4">
            {/* Avatar or sigil */}
            {data.image ? (
              <img
                className="rounded-xl"
                src={data.image}
                height={100}
                width={100}
              />
            ) : (
              <div className="rounded-xl overflow-hidden">
                <Sigil patp={id} size={100} />
              </div>
            )}
            <div className="flex flex-col">
              <h2>{id}</h2>
              <p>Urbit ID</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-wall-400">ID Type</p>
              <p className="font-mono">
                {ob.clan(id).slice(0, 1).toUpperCase() + ob.clan(id).slice(1)}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-wall-400">Status</p>
              <p className="font-mono">
                {network ? "Spawned/Owned" : "Unspawned"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-wall-400">Parent</p>
              <Link href={`/id/${parent}`}>
                <a className="type-ui font-mono text-green-400">{parent}</a>
              </Link>
            </div>
            {galaxy && (
              <div className="flex flex-col">
                <p className="font-bold text-wall-400">Galaxy</p>
                <Link href={`/id/${galaxy}`}>
                  <a className="type-ui font-mono text-green-400">{galaxy}</a>
                </Link>
              </div>
            )}
          </div>
          {(data.description !== "An Urbit ID." || markdown) && (
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
                Learn how get your own Urbit ID.
              </p>
              {/* TODO: Joining groups guide. */}
              <button className="button-lg max-w-xs bg-green-400 text-white">
                Get an Urbit ID
              </button>
            </div>
          </div>
          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-1">
            <p>Have an Urbit ID?</p>
            {/* TODO Submission guide. */}
            <p className="font-semibold text-green-400">
              Claim and customize your Urbit.org page
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
    join(process.cwd(), "content/id/", params.id.slice(1))
  ) || { data: {}, content: "" };

  if (!data.ship && ob.isValidPatp(params.id)) {
    data = { ship: params.id, description: "An Urbit ID." };
  }

  let network = await axios
    .get(
      `https://mt2aga2c5l.execute-api.us-east-2.amazonaws.com/get-node?urbit-id=${
        ob.isValidPatp(params.id) ? params.id : "~zod"
      }`
    )
    .then((res) => res.data);

  const markdown = await Markdown({ post: { content: content } });

  return {
    props: {
      data,
      markdown,
      network,
      params,
    },
  };
};

export default IdPage;
