import Link from "next/link";
import SingleColumn from "./SingleColumn";
import { contact } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="py-32 bg-wall w-full mt-48 flex justify-center">
      <SingleColumn>
        <div className="flex layout-wide">
          <div className="w-1/3 flex flex-col flex-shrink">
            <h4 className="mb-12">Use Urbit</h4>
            <Link href="">
              <a className="type-sub text-gray">Urbit Client</a>
            </Link>
            <Link href="">
              <a className="mt-2 type-sub text-gray">Urbit Binaries</a>
            </Link>
            <Link href="">
              <a className="mt-2 type-sub text-gray">Urbit Apps</a>
            </Link>
            <Link href="">
              <a className="mt-2 type-sub text-gray">Hosting Providers</a>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col flex-shrink">
            <h4 className="mb-12">About</h4>
            <Link href="/understanding-urbit">
              <a className="type-sub text-gray">What's Urbit?</a>
            </Link>
            <Link href="/understanding-urbit/urbit-id">
              <a className="mt-2 type-sub text-gray">Urbit ID</a>
            </Link>
            <Link href="/understanding-urbit/urbit-os">
              <a className="mt-2 type-sub text-gray">Urbit OS</a>
            </Link>
            <Link href="/faq">
              <a className="mt-2 type-sub text-gray">FAQ</a>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col flex-shrink">
            <h4 className="mb-12">News</h4>
            <Link href="/blog">
              <a className="type-sub text-gray">Blog</a>
            </Link>
            <Link href="/events">
              <a className="mt-2 type-sub text-gray">Events</a>
            </Link>
          </div>
        </div>
        <div className="flex layout-wide">
          <div className="w-1/3 flex flex-col">
            <h4 className="mb-12">Develop</h4>
            <Link href="/docs">
              <a className="type-sub text-gray">Documentation</a>
            </Link>
            <Link href="https://github.com/urbit">
              <a className="mt-2 type-sub text-gray">Github</a>
            </Link>
            <Link href="https://github.com/urbit/awesome-urbit#http-apis-airlock">
              <a className="mt-2 type-sub text-gray">Airlock APIs</a>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col">
            <h4 className="mb-12">Contribute</h4>
            <Link href="https://github.com/urbit/urbit/issues">
              <a className="type-sub text-gray">Issue Tracker</a>
            </Link>
            <Link href="/grants">
              <a className="mt-2 type-sub text-gray">Urbit Grants</a>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col">
            <h4 className="mb-12">Community</h4>
            <Link href="https://groups.google.com/a/urbit.org/g/dev?pli=1">
              <a className="type-sub text-gray">Dev Mailing List</a>
            </Link>
            <Link href="https://discord.gg/CfSKKaB2ep">
              <a className="mt-2 type-sub text-gray">Support Discord</a>
            </Link>
            <Link href="https://github.com/urbit/azimuth">
              <a className="mt-2 type-sub text-gray">Governance</a>
            </Link>
            <Link href="https://twitter.com/urbit">
              <a className="mt-2 type-sub text-gray">Twitter</a>
            </Link>
          </div>
        </div>
        <div className="flex layout-wide">
          <div className="w-1/3">
            <Link href="">
              <a className="type-sub text-gray">Privacy Policy</a>
            </Link>
          </div>
          <div className="w-1/3">
            <Link href="">
              <a className="type-sub text-gray">Terms of Service</a>
            </Link>
          </div>
          <div className="w-1/3">
            <Link href="">
              <a className="type-sub text-gray">{contact.email}</a>
            </Link>
          </div>
        </div>
      </SingleColumn>
    </footer>
  );
}
