import Link from "next/link";
import SingleColumn from "./SingleColumn";
import Section from "./Section";
import { contact } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="bg-wall-100 mt-20 w-full flex justify-center">
      <SingleColumn>
        <Section short className="flex flex-row flex-wrap">
          <div className="w-1/2 md:w-1/3 flex flex-col shrink">
            <h4 className="mt-16 mb-8">Use Urbit</h4>
            <Link href="/getting-started" passHref>
              <a className="type-bold text-wall-500">Getting Started</a>
            </Link>
            <Link href="/using" passHref>
              <a className="type-bold text-wall-500">User's Manual</a>
            </Link>
            <Link href="https://github.com/urbit/port/releases" passHref>
              <a className="type-bold text-wall-500">Urbit Client</a>
            </Link>
            <Link href="https://github.com/urbit/urbit/releases" passHref>
              <a className="type-bold text-wall-500">Urbit Binaries</a>
            </Link>
            {
              //   <Link href="">
              //   <div>
              //     <a className="mt-2 type-bold text-wall-500">Urbit Apps</a>
              //   </div>
              // </Link>
            }
            <Link href="/getting-started/planet/#hosting-providers" passHref>
              <a className="type-bold text-wall-500">Hosting Providers</a>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/3 flex flex-col shrink">
            <h4 className="mt-16 mb-8">About</h4>
            <Link href="/understanding-urbit" passHref>
              <a className="type-bold text-wall-500">What's Urbit?</a>
            </Link>
            <Link href="/understanding-urbit/urbit-id" passHref>
              <a className="type-bold text-wall-500">Urbit ID</a>
            </Link>
            <Link href="/understanding-urbit/urbit-os" passHref>
              <a className="type-bold text-wall-500">Urbit OS</a>
            </Link>
            <Link href="/audits" passHref>
              <a className="type-bold text-wall-500">Security Audits</a>
            </Link>
            <Link href="/faq" passHref>
              <a className="type-bold text-wall-500">FAQ</a>
            </Link>
            <Link href="https://media.urbit.org/whitepaper.pdf" passHref>
              <a className="type-bold text-wall-500">Whitepaper</a>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/3 flex flex-col shrink">
            <h4 className="mt-16 mb-8">News</h4>
            <Link href="/blog" passHref>
              <a className="type-bold text-wall-500">Blog</a>
            </Link>
            <Link href="/events" passHref>
              <a className="type-bold text-wall-500">Events</a>
            </Link>
            <Link href="/updates" passHref>
              <a className="type-bold text-wall-500">Updates</a>
            </Link>
          </div>

          <div className="w-1/2 md:w-1/3 flex flex-col">
            <h4 className="mt-16 mb-8">Develop</h4>
            <Link href="/docs" passHref>
              <a className="type-bold text-wall-500">Documentation</a>
            </Link>
            <Link href="https://github.com/urbit" passHref>
              <a className="type-bold text-wall-500">Github</a>
            </Link>
            <Link
              href="https://github.com/urbit/awesome-urbit#http-apis-airlock"
              passHref
            >
              <a className="type-bold text-wall-500">Airlock APIs</a>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/3 flex flex-col">
            <h4 className="mt-16 mb-8">Contribute</h4>
            <Link href="https://github.com/urbit/urbit/issues" passHref>
              <a className="type-bold text-wall-500">Issue Tracker</a>
            </Link>
            <Link href="/grants">
              <a className="type-bold text-wall-500" passHref>
                Urbit Grants
              </a>
            </Link>
          </div>

          <div className="w-1/2 md:w-1/3 flex flex-col">
            <h4 className="mt-16 mb-8">Community</h4>
            <Link
              href="https://groups.google.com/a/urbit.org/g/dev?pli=1"
              passHref
            >
              <a className="type-bold text-wall-500">Dev Mailing List</a>
            </Link>
            <Link href="https://github.com/urbit/azimuth" passHref>
              <a className="type-bold text-wall-500">Governance</a>
            </Link>
            <Link href="https://twitter.com/urbit" passHref>
              <a className="type-bold text-wall-500">Twitter</a>
            </Link>
          </div>
        </Section>
        <Section className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <Link href="/privacy" passHref>
              <a className="type-bold text-wall-500">Privacy Policy</a>
            </Link>
          </div>
          <div className="md:w-1/3">
            <Link href="/terms-of-service" passHref>
              <a className="type-bold text-wall-500">Terms of Service</a>
            </Link>
          </div>
          <div className="md:w-1/3">
            <a
              href={"mailto:" + contact.email}
              className="type-bold text-wall-500"
            >
              {contact.email}
            </a>
          </div>
        </Section>
      </SingleColumn>
    </footer>
  );
}
