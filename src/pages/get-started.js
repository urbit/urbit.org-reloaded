import React from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import { Container, Main, Section, FatBlock } from "@urbit/fdn-design-system";

import Footer from "@/components/Footer";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";
import PostCard from "@/components/PostCard";

const hosting = [
  {
    title: "Red Horizon",
    description:
      "Urbit made simple. Red Horizon provides free Urbit hosting with several urbit apps pre-installed.",
    image:
      "https://storage.googleapis.com/media.urbit.org/site/hosting/red-horizon2.svg",
    dark: false,
    href: "https://redhorizon.com/",
  },
  {
    title: "Tlon",
    description:
      "Download the Tlon app and you'll be on the network for free in seconds. Tlon is an Urbit-native toolkit for communicating with your community.",
    image:
      "https://storage.googleapis.com/media.urbit.org/site/hosting/tlon-2.png",
    dark: true,
    href: "https://tlon.network/lure/~halbex-palheb/uf-public",
  },
];

const self_hosting = [
  {
    title: "Native Planet",
    description:
      "Buy a Native Planet device and simply run Urbit yourself at home.",
    extra: {
      image: "https://media.urbit.org/site/hosting/native-planet-devices.png",
    },
    href: "https://www.nativeplanet.io/",
  },
  {
    title: "Run from a CLI (technical)",
    description:
      "Learn how to run Urbit on any compatible machine from the command line.",
    extra: {
      image:
        "https://storage.googleapis.com/media.urbit.org/site/getting-started/urbit%20boot2.gif",
    },
    href: "https://docs.urbit.org/manual/getting-started/self-hosted/cli",
  },
  {
    title: "Cloud hosting guide (technical)",
    description: "Host Urbit in the cloud on a Digital Ocean VPS.",
    extra: {
      image: "https://media.urbit.org/site/hosting/digital-ocean.svg",
    },
    href: "https://docs.urbit.org/manual/getting-started/self-hosted/cloud-hosting",
  },
];

function ImageCard({
  className,
  colorScheme,
  href,
  target,
  title,
  description,
  image,
}) {
  const style = image ? { backgroundImage: `url(${image})` } : {};

  return (
    <Link
      className={classnames(
        "aspect-[1.5/1] flex flex-col justify-between rounded-2xl text-[#F8FAF8]",
        className,
        { "bg-center bg-cover": image },
      )}
      style={style}
      href={href}
      target={target}
    >
      <h3 className="h2 w-full p-4 pb-[1.5em] rounded-t-2xl bg-gradient-to-b from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-transparent">
        {title}
      </h3>
      <p className="body-md w-full p-4 pt-[1.5em] rounded-b-2xl bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-transparent">
        {description}
      </p>
    </Link>
  );
}

export default function GetStarted({}) {
  const post = {
    title: "Get Started",
    description: "Links to get started with Urbit.",
  };

  return (
    <Container>
      <Head>
        <title>{`${post.title} • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main className="text-primary" singleColumn>
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">
            Get Started
          </h1>
          <p className="h1">
            Joining the Urbit network has <strong>never been easier</strong>.
            Learn how to join in <strong>seconds</strong> through a hosting
            provider, or run Urbit <strong>yourself</strong>.
          </p>
        </section>
        <Section divider={"border-primary"}>
          <div>
            <h2 className="h2">Use a Hosting Provider</h2>
            <p className="body-lg">The fastest way to use Urbit</p>
          </div>
          <FatBlock className="hidden xs:grid grid-cols-1 sm:grid-cols-2 gap-x-1 lg:gap-x-6 xl:gap-x-8">
            {hosting.map((props) => (
              <ImageCard {...props} target="_blank" />
            ))}
          </FatBlock>
          <FatBlock className="grid xs:hidden grid-cols-1 sm:grid-cols-2 gap-x-1 lg:gap-x-6 xl:gap-x-8">
            {hosting.map((props) => (
              <ImageCard {...props} target="_blank" />
            ))}
          </FatBlock>
        </Section>
        <Section divider={"border-primary"}>
          <div>
            <h2 className="h2">Run it yourself</h2>
            <p className="body-lg">Invest in running Urbit the sovereign way</p>
          </div>
          <FatBlock className="hidden xs:flex space-x-1 lg:space-x-6 xl:space-x-8">
            {self_hosting.map((props) => (
              <PostCard {...props} target="_blank" />
            ))}
          </FatBlock>
          <FatBlock className="flex xs:hidden flex-col space-y-1 lg:space-y-6 xl:space-y-8">
            {self_hosting.map((props) => (
              <PostCard {...props} target="_blank" />
            ))}
          </FatBlock>
        </Section>
        <Section tight divider={"border-primary"}>
          <h2 className="h1">Go deeper</h2>
          <p className="body-lg">
            Once you're up and running, read up on what you can do with your new
            Urbit node
          </p>
          <p className="body-lg">
            Learn to use Urbit's CLI{" "}
            <Link
              className="btn bg-primary hover:bg-secondary text-surface"
              href="https://docs.urbit.org/manual/os/basics"
            >
              User manual
            </Link>
          </p>
          <p className="body-lg">
            Learn the web interface{" "}
            <Link
              className="btn bg-primary hover:bg-secondary text-surface"
              href="https://docs.urbit.org/manual/getting-started/additional/getting-around"
            >
              Getting around guide
            </Link>
          </p>
          <p className="body-lg">
            Manage your Urbit ID{" "}
            <Link
              className="btn bg-primary hover:bg-secondary text-surface"
              href="https://docs.urbit.org/manual/id/using-bridge"
            >
              Bridge guide
            </Link>
          </p>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}
