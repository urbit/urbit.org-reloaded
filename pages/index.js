import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Container from '../components/Container'
import { getAllPosts } from '../lib/lib'

function TabCarousel(props) {
  if (props.children) {
    if (props.children[props.index]) {
      return props.children[props.index]
    }
  }
  return null
}

function BackgroundImage(props) {
  return (
    <div className={`bg-img`} style={{backgroundImage: `url(${props.src})`}}/>
  )
}

export default function Home({ posts, events }) {
  
  const [tab, setTab] = useState(0)
  
  return (
    <Container>
      <header className="layout-wide flex justify-between items-center pt-8">
          <a href="/docs" className="type-ui">Urbit</a>
          <nav className="flex items-center">
            <a href="/docs" className="type-ui text-gray mr-6">Docs</a>
            <a href="/blog" className="type-ui text-gray mr-6">Blog</a>
            <button className="button-sm">Download Port</button>
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
          <h3 className="pb-12">
            Urbit is a personal OS designed from scratch to run peer-to-peer applications.
          </h3>
          <p className="pb-12">
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
        <h3 className="pb-12 measure">
          Contribute to Urbit and get rewarded with address space.
        </h3>
        <div className="flex w-full items-center bg-lightGreen px-8 py-10 rounded-xl">
          <div className="flex items-center flex-col p-4 w-full">
            <h2>200+</h2>
            <h3 className="text-gray text-center pt-4">Urbit stars awarded</h3>
          </div>
          <div className="h-32 w-4 bg-green" />
          <div className="flex items-center flex-col p-4 w-full">
            <h2>1M+</h2>
            <h3 className="text-gray text-center pt-4">USD Rewarded</h3>
          </div>
          <div className="h-32 w-4 bg-green" />
          <div className="flex items-center flex-col p-4 w-full">
            <h2>90+</h2>
            <h3 className="text-gray text-center pt-4">Grants completed</h3>
          </div>
        </div>
        <div className='measure py-12'>
            <p className="pb-12">We regularly give away address space to reward community contributions, including education, promotion, and development.</p>
            <button className="button-lg">View Grants</button>
        </div>
      </section>
      
      <section className="layout-narrow pt-48">
        <div className='flex items-center measure pb-12'>
          <button 
            onClick={() => setTab(0)} 
            className={`tab-button-lg mr-6 ${tab === 0 ? 'text-black' : 'text-gray'}`}>
            Blog
          </button>
          <button 
            onClick={() => setTab(1)}
            className={`tab-button-lg ${tab === 1 ? 'text-black' : 'text-gray'}`}>
            Events
          </button>
        </div>
        
        <TabCarousel index={tab}>
          <div className="blog-grid">
            {
              posts.slice(0, 4).map((post, i) => {
                return (
                  <div className={`border-black cursor-pointer blog-grid-${i}`} key={post.slug}>
                    <Link href={'/blog/' + post.slug} key={`post-${post.slug}`}>
                      <div>
                        <BackgroundImage src={post.extra.image || ''} />
                        <p className='text-black mt-2'>{post.title}</p>
                        <caption className='text-black mt-2'>{post.extra.author}</caption>
                        <caption className='text-gray'>{post.date}</caption>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
          <div className="blog-grid">
            {
              events.slice(0, 4).map((event, i) => {
                return (
                  <div className={`border-black cursor-pointer blog-grid-${i}`} key={event.slug}>
                    <Link href={'/events/' + event.slug} key={`post-${event.slug}`}>
                      <div>
                        <BackgroundImage src={event.extra.image || ''} />
                        <p className='text-black mt-2'>{event.title || ''}</p>
                        <caption className='text-gray'>{event.date}</caption>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </TabCarousel>
        
        
      </section>
      
      <section className="layout-narrow pt-48">
        <div className='measure pb-12'>
          <h2 className="m-0 p-0 mr-4 pb-12">Inside the OS</h2>
          <p>We send monthly emails on system improvements, upcoming events, and community spotlights.</p>
        </div>
      </section>
      
      <footer className="pt-12 bg-yellow h-80 w-full">
      
      </footer>

    </Container>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'extra',
    // 'author',
    // 'ship',
    // 'image'
  ], 'blog')
  
  const events = getAllPosts([
    'title',
    'slug',
    'date',
    'extra',
  ], 'events')
  
  console.log(posts)

  return {
    props: { posts, events },
  }
}
