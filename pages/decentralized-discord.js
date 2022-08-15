import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  Container,
  Section,
  SingleColumn,
  IntraNav,
  TwoUp,
} from "@urbit/foundation-design-system";
import Meta from "../components/Meta";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Probably should make a core component, just pulling from operators.urbit.org for this one
function GuideCard({ title, description, href, className }) {
  return (
    <div
      className={
        "bg-wall-100 rounded-xl cursor-pointer aspect-w-none aspect-h-none md:aspect-w-5 md:aspect-h-4 h-full " +
        className
      }
    >
      <div className="p-8 measure flex justify-between flex-col">
        <div className="flex flex-col space-y-2">
          <h4 className="mb-2">{title}</h4>
          {description}
        </div>
        <Link href={href}>
          <a
            passHref
            className="bg-green-400 text-white rounded-lg flex justify-center p-3 w-20 mt-4 min-w-fit"
          >
            Get Started
          </a>
        </Link>
      </div>
    </div>
  );
}

export default function DiscordLanding({ search }) {
  const post = {
    title: "Urbit is Decentralized Discord",
    description:
      "There's no need to rely on centralized services to run a decentralized web3 project.",
    image:
      "https://storage.googleapis.com/media.urbit.org/site/landing/discord-opengraph.png",
  };
  return (
    <Container>
      <Head>
        <title>Urbit is Decentralized Discord (and a lot more)</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section className="pb-24">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="uppercase tracking-widest">Urbit is</h3>
            <h1 className="text-center">Decentralized Discord</h1>
            <Link href="/ecosystem">
              <a className="text-wall-400 pb-12">(and a lot more)</a>
            </Link>
          </div>
          <video autoPlay loop playsInline>
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/groupsdemo.webm"
              type="video/webm"
            />
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/groupsdemo-2.mp4"
              type="video/mp4"
            />
          </video>

          <div className="md:p-16">
            <p className="type-ui text-center">
              Urbit’s Groups app allows teams, communities, and friends to get
              together and communicate using their own private servers.
            </p>
            <p className="type-ui pt-8 text-center">
              Unlike Discord, only you can delete your Urbit and identity.
            </p>
          </div>
        </Section>

        <Section className="justify-center flex-col flex items-center space-y-8">
          <h2 className="text-center">
            Host your own group in under 60 minutes
          </h2>
          <p className="text-center">
            Get immediate{" "}
            <Link href="/applications/~lander-dister-dozzod-dozzod/groups">
              decentralized messaging, blogging, chatting, and collections.
            </Link>
          </p>
          <TwoUp>
            <GuideCard
              title="Host a Group"
              description={
                <>
                  <p>Groups need a host that's always online.</p>
                  <p>
                    With Urbit, that just means getting an Urbit ID and then a
                    quick installation on a VPS or local computer.
                  </p>
                </>
              }
              href="https://operators.urbit.org/manual/running/hosting"
            />
            <GuideCard
              title="Join a Group"
              description={
                <p>
                  The easiest way to jump on the network is to download our
                  desktop application and boot up a comet - a Temporary ID.
                </p>
              }
              href="https://urbit.org/getting-started/desktop"
            />
          </TwoUp>

          <Link href="/applications/~lander-dister-dozzod-dozzod/groups">
            <a className="pt-16 flex space-x-2 text-green-400 font-semibold">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="5" fill="#DC5F3F" />
              </svg>
              <span>Learn more about Urbit Groups</span>
            </a>
          </Link>
          <Link href="/overview">
            <a className="flex space-x-2 text-green-400 font-semibold">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_216_1182)">
                  <circle cx="15.5" cy="13.5" r="11.5" fill="white" />
                </g>
                <path
                  d="M9.00544 15.6293C8.97041 14.6356 9.10469 13.7944 9.40828 13.1057C9.71188 12.4169 10.1527 11.8938 10.7307 11.5363C11.3145 11.1788 12.0005 11 12.7887 11C13.3375 11 13.8629 11.1025 14.365 11.3076C14.8671 11.5126 15.4364 11.8675 16.0728 12.3722C16.4114 12.6404 16.6975 12.8454 16.931 12.9874C17.1645 13.1241 17.4331 13.1924 17.7367 13.1924C18.1512 13.1924 18.4928 13.0478 18.7613 12.7587C19.0299 12.4642 19.1554 11.9989 19.1379 11.3628H21.9928C22.0337 12.3617 21.8994 13.2056 21.59 13.8943C21.2806 14.5831 20.8339 15.1062 20.2501 15.4637C19.6663 15.8212 18.9861 16 18.2096 16C17.6316 16 17.0886 15.8922 16.5807 15.6767C16.0786 15.4558 15.521 15.1036 14.908 14.6199C14.546 14.3307 14.257 14.123 14.041 13.9968C13.825 13.8654 13.5681 13.7997 13.2704 13.7997C12.8558 13.7997 12.5143 13.9416 12.2457 14.2256C11.9772 14.5042 11.8516 14.9721 11.8691 15.6293H9.00544Z"
                  fill="#24221E"
                />
                <defs>
                  <filter
                    id="filter0_d_216_1182"
                    x="0"
                    y="0"
                    width="31"
                    height="31"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_216_1182"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_216_1182"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <span>Learn more about Urbit</span>
            </a>
          </Link>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
