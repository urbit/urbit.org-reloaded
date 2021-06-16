import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import BackgroundImage from "../components/BackgroundImage";
import Lorem from "../components/Lorem";
import { getAllPosts, formatDate } from "../lib/lib";

function Sidebar(props) {
  return (
    <div className="flex flex-col w-72 bg-wall max-h-screen h-screen">
      <header className="flex justify-between items-center pl-12 pt-8 pb-8">
        <Link href="/">
          <a className="type-ui">Urbit</a>
        </Link>
      </header>
      <div className="overflow-y-scroll p-12 pt-16">
        {props.children}
        <div className="pb-32" />
      </div>
    </div>
  );
}

function ContentArea(props) {
  return (
    <div className="w-full">
      <header className="flex justify-between items-center px-24 pt-8 pb-8">
        <div className="type-ui">Install Urbit</div>
      </header>
      <div className="px-24 pb-24 pt-16 flex flex-col w-full max-h-screen h-screen overflow-y-scroll">
        <div className="type-ui text-lightGray">Breadcrumbs/go/here</div>
        <h2 className="mb-16 mt-4">Getting Started</h2>
        {props.children}
        <div className="pb-32" />
      </div>
    </div>
  );
}

export default function DocsLayout({ posts }) {
  return (
    <div className="flex w-screen h-screen min-h-screen w-screen overflow-hidden">
      <Sidebar>
        <Lorem />
      </Sidebar>
      <ContentArea>
        <Lorem />
      </ContentArea>
    </div>
  );
}

// export async function getStaticProps() {
//   const docs = getAllPosts([
//     'title',
//     'slug',
//     'date',
//     'description',
//     'extra',
//   ], 'docs')
//
//   return {
//     props: { posts },
//   }
// }
