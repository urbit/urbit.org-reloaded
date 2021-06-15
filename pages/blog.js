import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Container from '../components/Container'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SingleColumn from '../components/SingleColumn'
import BackgroundImage from '../components/BackgroundImage'
import { getAllPosts, formatDate } from '../lib/lib'


export default function BlogPost({ posts }) {
    
  return (
    <Container>
      <SingleColumn>
        <Header />
        <section className="layout-wide pt-48">
          <div className="measure">
            <h2 className="pb-12">Urbit Blog</h2>
            <p className="pb-6">Stories from the broader Urbit community, the Urbit Foundation, and the many people contributing to Urbit.</p>
            <p>Subscribe to the Urbit Newsletter for regular updates, including new blog posts and events.</p>
          </div>
        </section>
        <section className="layout-wide pt-24">
          {
            posts.map((post) => {
              return (
                <Link href={`/blog/${post.slug}`}>
                  <div key={post.slug} className='pb-24 cursor-pointer'>
                    <BackgroundImage src={post.extra.image || ''} style={{ height:"720px" }} className="w-full rounded" />
                    <h3 className='mt-4'>{post.title}</h3>
                    <p className='text-black mt-2'>{post.extra.author}</p>
                    <p className='text-gray mt-2'>{formatDate(new Date(post.date))}</p>
                  </div>
                </Link>
              )
            })
          }
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

  return {
    props: { posts },
  }
}

