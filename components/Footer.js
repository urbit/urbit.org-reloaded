import Link from "next/link";
import SingleColumn from "./SingleColumn";
import Section from "./Section";
import { contact } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="py-16 bg-wall w-full mt-48 flex justify-center">
      <SingleColumn>
        <Section short className="flex">
          <div className="w-1/3 flex flex-col flex-shrink">
            <h4 className="mb-8">Use Urbit</h4>
            <Link href="">
              <div>
                <a className="type-sub text-gray">Urbit Client</a>
              </div>
            </Link>
            <Link href="">
              <div>
                <a className="mt-2 type-sub text-gray">Urbit Binaries</a>
              </div>
            </Link>
            <Link href="">
              <div>
                <a className="mt-2 type-sub text-gray">Urbit Apps</a>
              </div>
            </Link>
            <Link href="">
              <div>
                <a className="mt-2 type-sub text-gray">Hosting Providers</a>
              </div>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col flex-shrink">
            <h4 className="mb-8">About</h4>
            <Link href="/understanding-urbit">
              <div>
                <a className="type-sub text-gray">What's Urbit?</a>
              </div>
            </Link>
            <Link href="/understanding-urbit/urbit-id">
              <div>
                <a className="mt-2 type-sub text-gray">Urbit ID</a>
              </div>
            </Link>
            <Link href="/understanding-urbit/urbit-os">
              <div>
                <a className="mt-2 type-sub text-gray">Urbit OS</a>
              </div>
            </Link>
            <Link href="/faq">
              <div>
                <a className="mt-2 type-sub text-gray">FAQ</a>
              </div>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col flex-shrink">
            <h4 className="mb-8">News</h4>
            <Link href="/blog">
              <div>
                <a className="type-sub text-gray">Blog</a>
              </div>
            </Link>
            <Link href="/events">
              <div>
                <a className="mt-2 type-sub text-gray">Events</a>
              </div>
            </Link>
          </div>
        </Section>
        <Section short className="flex">
          <div className="w-1/3 flex flex-col">
            <h4 className="mb-8">Develop</h4>
            <Link href="/docs">
              <div>
                <a className="type-sub text-gray">Documentation</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit">
              <div>
                <a className="mt-2 type-sub text-gray">Github</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit/awesome-urbit#http-apis-airlock">
              <div>
                <a className="mt-2 type-sub text-gray">Airlock APIs</a>
              </div>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col">
            <h4 className="mb-8">Contribute</h4>
            <Link href="https://github.com/urbit/urbit/issues">
              <div>
                <a className="type-sub text-gray">Issue Tracker</a>
              </div>
            </Link>
            <Link href="/grants">
              <div>
                <a className="mt-2 type-sub text-gray">Urbit Grants</a>
              </div>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col">
            <h4 className="mb-8">Community</h4>
            <Link href="https://groups.google.com/a/urbit.org/g/dev?pli=1">
              <div>
                <a className="type-sub text-gray">Dev Mailing List</a>
              </div>
            </Link>
            <Link href="https://discord.gg/CfSKKaB2ep">
              <div>
                <a className="mt-2 type-sub text-gray">Support Discord</a>
              </div>
            </Link>
            <Link href="https://github.com/urbit/azimuth">
              <div>
                <a className="mt-2 type-sub text-gray">Governance</a>
              </div>
            </Link>
            <Link href="https://twitter.com/urbit">
              <div>
                <a className="mt-2 type-sub text-gray">Twitter</a>
              </div>
            </Link>
          </div>
        </Section>
        <Section short className="flex">
          <div className="w-1/3">
            <Link href="/privacy">
              <div>
                <a className="type-sub text-gray">Privacy Policy</a>
              </div>
            </Link>
          </div>
          <div className="w-1/3">
            <Link href="/terms-of-service">
              <div>
                <a className="type-sub text-gray">Terms of Service</a>
              </div>
            </Link>
          </div>
          <div className="w-1/3">
            <div>
              <a className="type-sub text-gray">{"mailto:" + contact.email}</a>
            </div>
          </div>
        </Section>
      </SingleColumn>
    </footer>
  );
}
