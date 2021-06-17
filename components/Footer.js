import Link from "next/link";
import SingleColumn from "./SingleColumn";
import { contact } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="py-32 bg-wall w-full mt-48 flex justify-center">
      <SingleColumn>
        <div className="flex layout-wide">
          <div className="w-1/3 flex flex-col">
            <h3 className="mb-12">Use Urbit</h3>
            <Link className="mt-4" href="">
              <a className="type-sub text-gray">Urbit Client</a>
            </Link>
            <Link className="mt-4" href="">
              <a className="type-sub text-gray">Urbit Binaries</a>
            </Link>
            <Link className="mt-4" href="">
              <a className="type-sub text-gray">Urbit Apps</a>
            </Link>
            <Link className="mt-4" href="">
              <a className="type-sub text-gray">Host-Providers</a>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col">
            <h3 className="mb-12">About</h3>
            <Link className="mt-4" href="/understanding-urbit">
              <a className="type-sub text-gray">What's Urbit?</a>
            </Link>
            <Link className="mt-4" href="/understanding-urbit/urbit-id">
              <a className="type-sub text-gray">Urbit ID</a>
            </Link>
            <Link className="mt-4" href="/understanding-urbit/urbit-os">
              <a className="type-sub text-gray">Urbit OS</a>
            </Link>
            <Link className="mt-4" href="/faq">
              <a className="type-sub text-gray">FAQ</a>
            </Link>
          </div>
          <div className="w-1/3 flex flex-col">
            <h3 className="mb-12">News</h3>
          </div>
        </div>
        <div className="flex layout-wide mt-24">
          <div className="w-1/3 flex flex-col">
            <h3 className="mb-12">Develop</h3>
          </div>
          <div className="w-1/3 flex flex-col">
            <h3 className="mb-12">Contribute</h3>
          </div>
          <div className="w-1/3 flex flex-col">
            <h3 className="mb-12">Community</h3>
          </div>
        </div>
        <div className="flex layout-wide mt-64">
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
