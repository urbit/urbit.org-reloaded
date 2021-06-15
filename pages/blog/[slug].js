import { useRouter } from 'next/router'
import { getPostBySlug, getAllPosts, getNextPost, getPreviousPost } from '../../lib/lib'
import Head from 'next/head'
import Link from 'next/link'
import ErrorPage from '../404'
import Container from '../../components/Container'
import Markdown from '../../components/Markdown'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SingleColumn from '../../components/SingleColumn'

import {
  name,
} from '../../lib/constants'

export default function Post({ post, nextPost, previousPost }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
	return <ErrorPage />
  }
  
  return (
	<Container>
		<SingleColumn>
			<Header />
			<section className="flex flex-col layout-wide pt-48">
				<h1>{post.title}</h1>
			</section>
			<article className="flex items-center pt-48">
		    		<Markdown post={post} />
			</article>
			<section className="layout-narrow pt-48">
				<Link href={nextPost.slug}>{nextPost.title}</Link>
				<Link href={previousPost.slug}>{previousPost.title}</Link>
			</section>
		</SingleColumn>
		<Footer />
	</Container>
  )
}

// 
export async function getStaticProps({ params }) {
	
	const nextPost = getNextPost(params.slug, [
		'title',
		'slug',
		'date',
		'description',
		'extra',
	], 'blog')
	
	const previousPost = getPreviousPost(params.slug, [
		'title',
		'slug',
		'date',
		'description',
		'extra',
	], 'blog')
				
	const post = getPostBySlug(params.slug, [
		'title',
		'slug',
		'date',
		'description',
		'content',
		'extra',
	], 'blog')

	return {
		props: { post, nextPost, previousPost },
	}
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug', 'date'], 'blog')

  return {
	paths: posts.map((post) => {
	  return {
		params: {
		  slug: post.slug,
		},
	  }
	}),
	fallback: false,
  }
}