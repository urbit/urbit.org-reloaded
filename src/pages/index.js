import React from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import { Container, Main, Section, FatBlock } from "@urbit/fdn-design-system";
import IntraNav from "../components/IntraNav";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import NewsletterSignup from "../components/NewsletterSignup";
import Org from "../components/ecosystem/Org";

function CTAs({ className, links }) {
  return (
    <div className={"flex flex-wrap flex-row gap-2 " + className}>
      {links.map((link) => (
        <Link
          className="btn bg-primary hover:bg-secondary text-surface"
          href={link.url}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function Home({}) {
  const post = {
    title: "Urbit",
    description: "A clean-slate OS and network for the 21st century.",
  };

  return (
    <Container>
      <Head>
        <title>urbit.org</title>
        {Meta(post, false, true)}
      </Head>
      <IntraNav />
      <Main className="text-primary body-lg" singleColumn>
        <h1 className="h0 heading mt-8 mb-8 md:mb-16 lg:mb-20">
          Welcome to the sovereign internet.
        </h1>
        <img
          className="rounded-lg"
          alt=""
          src="https://storage.googleapis.com/media.urbit.org/site/landing/web-screenshots.jpeg"
        />

        <Section divider={"border-primary"}>
          <h1 className="h1">
            Urbit is a new computing paradigm with complete ownership.
          </h1>
          <div className="body-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between bg-container rounded-lg p-4">
              <h3 className="text-on-container h-[6.5em] overflow-hidden">
                Leave the centralized internet behind. Run applications the
                sovereign way.
              </h3>
              <Link
                className="btn bg-on-container text-inverse-on-container hover:bg-on-container-variant w-min"
                href="/get-started"
              >
                Join the network
              </Link>
            </div>
            <div className="flex flex-col justify-between bg-container rounded-lg p-4">
              <h3 className="text-on-container h-[6.5em] overflow-hidden">
                Make your application sovereign with personal servers for you
                and your community.
              </h3>
              <Link
                className="btn bg-on-container text-inverse-on-container hover:bg-on-container-variant w-min"
                href="https://docs.urbit.org/"
              >
                Build on Urbit
              </Link>
            </div>
          </div>
        </Section>

        <Section divider={"border-primary"}>
          <p className="h1">Own your computer in the ways that matter. </p>

          <FatBlock className="body-lg border border-primary rounded-lg">
            <table className="w-full table-fixed">
              <tbody>
                <tr className="border-b">
                  <td className="align-top p-4 border-r">
                    <p>Data Ownership </p>
                    <p className="text-secondary">
                      Full command over applications and data
                    </p>
                  </td>
                  <td className="align-top p-4">
                    <p>Persistent Identity </p>
                    <p className="text-secondary">
                      User controlled public-key infrastructure
                    </p>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="align-top p-4 border-r">
                    <p>Reduced Platform Risk </p>
                    <p className="text-secondary">
                      Ensuring continuous operation
                    </p>
                  </td>
                  <td className="align-top p-4">
                    <p>Network Resilience </p>
                    <p className="text-secondary">
                      Distributed servers avoid single points of failure
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="align-top p-4 border-r">
                    <p>Privacy & Security </p>
                    <p className="text-secondary">
                      Decentralized storage for data confidentiality
                    </p>
                  </td>
                  <td className="align-top p-4">
                    <p>Cost Predictability €</p>
                    <p className="text-secondary">
                      Fixed hardware costs with no hidden fees
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </FatBlock>
        </Section>

        <Section divider={"border-primary"}>
          <p className="h1">
            Explore one of the fastest growing developer ecosystems.
          </p>
          <div className="body-lg grid grid-cols-2 md:grid-cols-4 gap-4">
            <Org
              title="Tlon"
              description="Urbit core infrastructure"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/tlon-b.svg"
              slug="tlon"
              extended
            />
            <Org
              title="Native Planet"
              description="Urbit-centric hardware"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/native-planet-b.svg"
              slug="nativeplanet"
              extended
            />
            <Org
              title="Zorp"
              description="Computation with ZK proofs"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/zorp-b.svg"
              slug="zorp"
              extended
            />
            <Org
              title="~Tirrel Corp"
              description="Urbit product studio"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/tirrel-b.svg"
              slug="tirrel"
              extended
            />
          </div>
        </Section>

        <Section divider={"border-primary"} narrow>
          <p className="h1">Imagine an alternative computing paradigm.</p>
          <div className="w-full aspect-[1114/699] !my-16 md:!my-20 lg:!my-24">
            <div
              className="h-full bg-primary"
              style={{
                WebkitMaskImage: "url(/images/compute-paradigm.svg)",
                WebkitMaskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskImage: "url(/images/compute-paradigm.svg)",
                maskSize: "100% 100%",
                maskRepeat: "no-repeat",
              }}
            />
          </div>
          <p>
            Urbit takes computing history in a different direction. Computing
            has evolved to become smaller and more virtual. With Urbit, your
            computer is entirely <strong>self-contained</strong>,{" "}
            <strong>digital</strong>, and <strong>cryptographic</strong>.
          </p>
        </Section>

        <Section className="body-lg" divider={"border-primary"} narrow loose>
          <Section>
            <h2 className="h2">Urbit Newsletter</h2>
            <NewsletterSignup />
          </Section>
          <Section>
            <h2 className="h2">Follow</h2>
            <CTAs
              links={[
                { label: "Twitter", url: "https://twitter.com/urbit" },
                { label: "Instagram", url: "https://instagram.com/urbit" },
                {
                  label: "YouTube",
                  url: "https://www.youtube.com/channel/UCNYIS9_SktINCC9yqO4CFZw",
                },
                { label: "GitHub", url: "https://github.com/urbit" },
              ]}
            />
          </Section>

          <Section>
            <h2 className="h2">Join our group on Urbit</h2>
            <Link
              className="btn bg-primary hover:bg-secondary text-surface"
              href="https://tlon.network/lure/~halbex-palheb/uf-public"
            >
              UF Public
            </Link>
          </Section>

          <Section>
            <h2 className="h2">Email</h2>
            <p>
              <Link
                className="hover:text-secondary"
                href="mailto: support@urbit.org"
              >
                support@urbit.org
              </Link>
              <br />
              <Link
                className="hover:text-secondary"
                href="mailto: grants@urbit.org"
              >
                grants@urbit.org
              </Link>
              <br />
              <Link
                className="hover:text-secondary"
                href="mailto: assembly@urbit.org"
              >
                assembly@urbit.org
              </Link>
              <br />
              <Link
                className="hover:text-secondary"
                href="mailto: newsletter@urbit.org"
              >
                newsletter@urbit.org
              </Link>
              <br />
              <Link
                className="hover:text-secondary"
                href="mailto: press@urbit.org"
              >
                press@urbit.org
              </Link>
            </p>
          </Section>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}
