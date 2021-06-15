import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Container from '../components/Container'
import SingleColumn from '../components/SingleColumn'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackgroundImage from '../components/BackgroundImage'
import TabCarousel from '../components/TabCarousel'
import { getAllPosts, formatDate } from '../lib/lib'
import { contact } from '../lib/constants'

export default function Home({ posts, events }) {
  
  const [tab, setTab] = useState(0)
  
  return (
    <Container>
      <SingleColumn>
        <Header />
        
        <section className="layout-narrow pt-48">
          <h1>A general-purpose,</h1>
          <h1>peer-to-peer,</h1>
          <h1>personal computing system.</h1>
        </section>
        
        <section className="layout-wide pt-48">
          <div className="bg-wall w-11/12 hero-card-height rounded-3xl flex">
            <div className="pt-20 pl-12 w-7/12">
              <div className="pb-8">
                <h2 className="p-0 m-0 pb-2">Introducing</h2><h2 className="text-green p-0 m-0">Port</h2>
              </div>
              <h3 className="pb-8">The Urbit client, now in beta.</h3>
              <p className="pb-24">Getting into Urbit is now as simple as installing an app on your computer.</p>
              <button className="button-lg type-ui mb-5 bg-green">Download For Mac</button>
              <a className="type-ui text-gray">View on GitHub</a>
            </div>
            <div className="bg-black w-full rounded-xl hero-image-height hero-image mt-8" />
          </div>
        </section>
        
        <section className="layout-narrow pt-48">
          <div className='flex items-center measure pb-12'>
            <h2 className="m-0 p-0 mr-4">Urbit Grants</h2>
            <button className="flex bg-green text-white type-ui px-4 items-center justify-center h-12 rounded-full">32 Open</button>
          </div>
          <div className="flex w-full items-center bg-washedGreen px-8 py-8 rounded-xl">
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green">200+</h2>
              <h3 className="text-green text-center pt-2">Urbit stars awarded</h3>
            </div>
            <div className="h-24 w-4 bg-lightGreen" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green">1M+</h2>
              <h3 className="text-green text-center pt-2">USD Rewarded</h3>
            </div>
            <div className="h-24 w-4 bg-lightGreen" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green">90+</h2>
              <h3 className="text-green text-center pt-2">Grants completed</h3>
            </div>
          </div>
          <div className='measure py-12'>
              <p className="pb-12">We regularly give away address space to reward community contributions, including education, promotion, and development.</p>
              <button className="button-lg bg-green">View Grants</button>
          </div>
        </section>
        
        <section className="layout-narrow pt-48">
        <div className='measure'>
          <h2 className="pb-12">Build on Urbit</h2>
          <h3 className="pb-12">
            Urbit is a personal OS designed from scratch to run peer-to-peer applications.
          </h3>
          <p className="pb-12">
            It solves the hard problems of implementing a peer-to-peer network (including identity, NAT traversal, and exactly-once delivery) in the kernel so app developers can focus on business logic. 
          </p>
          <p className="pb-12">
            The entire OS is a <Link href=''><a>single pure function</a></Link> that provides application developers with strong guarantees: automated persistence and memory management, repeatable builds, and support for hot code reloading.
          </p>
          <p className="pb-12">
          You can get started learning how to <Link href=''><a>contribute to the project</a></Link>, or view a variety of <Link href=''><a>libraries</a></Link> for building on Urbit using the languages you already know.
          </p>
          <button className="button-lg type-ui bg-black">Read the Developer Docs</button>
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
                          <BackgroundImage className="w-full h-80 rounded" src={post.extra.image || ''} />
                          <p className='text-black type-h3 mt-2'>{post.title}</p>
                          <p className='text-black mt-2'>{post.extra.author}</p>
                          <p className='text-gray mt-2'>{formatDate(new Date(post.date))}</p>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
              <div>
                <Link href="/blog"><button className="button-lg type-ui">Read More</button></Link>
              </div>
            </div>
            <div className="blog-grid">
              {
                events.slice(0, 4).map((event, i) => {
                  return (
                    <div className={`border-black cursor-pointer blog-grid-${i}`} key={event.slug}>
                      <Link href={'/events/' + event.slug} key={`post-${event.slug}`}>
                        <div>
                          <BackgroundImage className="w-full h-80 rounded-lg" src={event.extra.image || ''} />
                          <p className='text-black mt-2'>{event.title || ''}</p>
                          <p className='text-gray'>{formatDate(new Date(event.date))}</p>
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
          <div className='measure'>
            <h2 className="m-0 p-0 mr-4 pb-12">Stay In Touch</h2>
            <p className='pb-12'>We send monthly emails on system improvements, upcoming events, and community spotlights.</p>
          </div>
            <form 
              action="https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&amp;amp;id=be143888d2"
              method="post" id="mc-embedded-subscribe-form" 
              name="mc-embedded-subscribe-form" 
              className="validate form max-w-screen-sm"
              target="_blank" 
              novalidate>
              <div className="input-group" id="mc_embed_signup_scroll">
                <div className="mc-field-group w-full relative">
                  <input
                    className="text-gray type-ui black border-green border-4 px-3 w-full mb-2 h-16 rounded-xl" 
                    type="email" 
                    name="EMAIL"
                    id="mce-EMAIL" 
                    placeholder="your@email.com" />
                  <div className="flex h-16 items-center justify-center absolute top-0 right-6">
                    <button 
                      id="mc-embedded-subscribe" 
                      className="type-ui text-gray bg-transparent" 
                      type="submit" 
                      name="subscribe">
                      {/* onClick={() => _paq.push(['trackEvent', 'Mailing List', 'Subscribe'])}> */}
                        Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <h3 className="mt-8">Follow us on <a className="text-green" href={contact.twitter}>Twitter</a></h3>
            <h3 className="mt-8">Explore code on <a className="text-green" href={contact.github}>Github</a></h3>
            <h3 className="mt-8">Ask questions in our <a className="text-green" href={contact.discord}>Discord</a></h3>
            <h3 className="mt-8">Boot Urbit and join <code className="bg-wall p-2 rounded-lg">{contact.urbitCommunity}</code></h3>
          
        </section>
        
      </SingleColumn>
      
      <Footer/>
      
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
  ], 'blog')
  
  const events = getAllPosts([
    'title',
    'slug',
    'date',
    'extra',
  ], 'events')

  return {
    props: { posts, events },
  }
}
