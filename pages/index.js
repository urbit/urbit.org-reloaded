import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/Container'
import { getAllPosts } from '../lib/lib'

export default function Home({ posts }) {
  return (
    <Container>
      <header className="layout-wide flex justify-between items-center pt-8">
          <a href="/docs" className="type-ui">Urbit</a>
          <nav className="flex items-center">
            <a href="/docs" className="type-ui text-gray mr-6">Docs</a>
            <a href="/blog" className="type-ui text-gray mr-6">Blog</a>
            <button className="button-sm type-ui">Download Port</button>
          </nav>
      </header>
      
      <section className="layout-narrow pt-48">
        <h1>A general-purpose, peer-to-peer, personal computing system.</h1>
      </section>
      
      <section className="layout-wide pt-48">
        <div className="bg-yellow w-11/12 hero-card-height rounded-3xl flex">
          <div className="pt-20 pl-12 w-7/12">
            <div className="pb-7">
              <h2 className="text-gray p-0 m-0">Introducing</h2><h2 className="p-0 m-0">Port</h2>
            </div>
            <h3 className="pb-5">The Urbit client, now in beta.</h3>
            <p className="pb-5">Port lets you... Sed iste iusto deserunt id dolores dignissimos est expedita. Earum ut et nemo et voluptatem sunt ea. Delectus sed unde fugit reiciendis. Voluptatum animi laborum fugit dolores. Dolore qui asperiores eum iusto debitis sit. Et vel dolores voluptas.</p>
            <button className="button-lg type-ui mb-5">Download For Mac</button>
            <a className="">View on GitHub</a>
          </div>
          <div className="bg-black w-full rounded-xl hero-image-height hero-image mt-8" />
        </div>
      </section>
      
      <section className="layout-narrow pt-48">
        <div className='measure'>
          <h2 className="pb-12">Develop on Urbit</h2>
          <p className="pb-6">
            Urbit is a personal OS designed from scratch to run peer-to-peer applications.
          </p>
          <p className="pb-6">
            The entire OS is a <a>single pure function</a> that provides application developers with strong guarantees: automated persistence and memory management, repeatable builds, and support for hot code reloading.
          </p>
          <button className="button-lg type-ui">Contribute</button>
        </div>
      </section>
      
      <section className="layout-narrow pt-48">
        <div className='flex items-center measure pb-12'>
          <h2 className="m-0 p-0 mr-4">Urbit Grants</h2>
          <button className="flex bg-green type-ui px-4 items-center justify-center h-12 rounded-full">32 Open</button>
        </div>
        <div className="flex w-full bg-lightGreen px-8 py-12 rounded-xl">
          <div className="flex items-center flex-col p-4 w-full">
            <h2>200+</h2>
            <h3 className="text-gray text-center pt-4">Urbit stars awarded</h3>
          </div>
          <div className="h-48 w-4 bg-green" />
          <div className="flex items-center flex-col p-4 w-full">
            <h2>1M+</h2>
            <h3 className="text-gray text-center pt-4">USD Rewarded</h3>
          </div>
          <div className="h-48 w-4 bg-green" />
          <div className="flex items-center flex-col p-4 w-full">
            <h2>90+</h2>
            <h3 className="text-gray text-center pt-4">Grants completed</h3>
          </div>
        </div>
        <div className='measure py-12'>
            <p className="pb-12">We regularly give away address space to reward community contributions, including education, promotion, and development.</p>
            <button className="button-lg type-ui">Contribute</button>
        </div>
      </section>
  

      {
        posts.map((post, i) => {
          console.log(post)
          return (
            <div className='mb-40 cursor-pointer'>
              <Link href={'/blog/' + post.slug} key={'home-post-' + post.slug}>
                <div>
                  <p className='text-black mt-2'>{post.title}</p>
                  <p className='text-gray'>{post.date}</p>
                </div>
              </Link>
            </div>
          )
        }
        )}
    </Container>
  )
}

export async function getStaticProps() {
  const entries = getAllPosts([
    'title',
    'slug',
    'date',
  ])

  return {
    props: { posts: entries },
  }
}
