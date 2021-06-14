import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Container from '../components/Container'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SingleColumn from '../components/SingleColumn'
import { getAllPosts } from '../lib/lib'


export default function BlogPost({ posts }) {
    
  return (
    <Container>
      <SingleColumn>
        <Header />
        <section className="layout-narrow pt-48">
          {
            posts.map((post) => <div key={post.slug}>{post.title}</div>)
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

