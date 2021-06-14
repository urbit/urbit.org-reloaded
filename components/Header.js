import Link from 'next/link'

export default function Header() {
	return (
		<header className="layout-wide flex justify-between items-center pt-8">
		  <Link href="/"><a className="type-ui">Urbit</a></Link>
		  <nav className="flex items-center">
			<Link href="/docs"><a className="type-ui text-gray mr-6">Docs</a></Link>
			<Link href="/blog"><a className="type-ui text-gray mr-6">Blog</a></Link>
			<Link href="/events"><a className="type-ui text-gray mr-6">Events</a></Link>
			<button className="button-sm bg-green">Download Port</button>
		  </nav>
	  </header>
	)
}
