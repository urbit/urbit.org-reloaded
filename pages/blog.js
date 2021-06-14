import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Container from '../components/Container'
import Footer from '../components/Footer'
import { getAllPosts } from '../lib/lib'

function BackgroundImage(props) {
  return (
    <div className={`bg-img`} style={{backgroundImage: `url(${props.src})`}}/>
  )
}

export default function Home({ posts }) {
    
  return (
    <Container>
      <header className="layout-wide flex justify-between items-center pt-8">
          <a href="/" className="type-ui">Urbit</a>
          <nav className="flex items-center">
            <a href="/docs" className="type-ui text-gray mr-6">Docs</a>
            <a href="/blog" className="type-ui text-gray mr-6">Blog</a>
            <button className="button-sm">Download Port</button>
          </nav>
      </header>
      <section className="layout-narrow pt-48">
        {
          posts.map((post) => <div key={post.slug}>{post.title}</div>)
        }
      </section>
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
