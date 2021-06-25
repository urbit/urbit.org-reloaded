import Link from "next/link";

export default function Sidebar(props) {
  return (
    <div className="flex flex-col w-96 bg-wall max-h-screen h-screen">
      <header className="flex flex-shrink-0 justify-between items-center pl-6 pt-12 pb-8">
        <Link href="/">
          <a className="type-ui text-gray">Urbit.org</a>
        </Link>
      </header>
      <div className="overflow-y-scroll p-6 pt-16">
        {props.children}
        <div className="pb-32" />
      </div>
    </div>
  );
}
