export default function Header() {
	return (
		<header className="layout-wide flex justify-between items-center pt-8">
		  <a href="/" className="type-ui">Urbit</a>
		  <nav className="flex items-center">
			<a href="/docs" className="type-ui text-gray mr-6">Docs</a>
			<a href="/blog" className="type-ui text-gray mr-6">Blog</a>
			<button className="button-sm">Download Port</button>
		  </nav>
	  </header>
	)
}
