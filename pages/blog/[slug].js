import { useRouter } from 'next/router'
import { getPostBySlug, getAllPosts, markdownToHtml } from '../../lib/lib'
import Head from 'next/head'
import ErrorPage from '../404'
import Container from '../../components/Container'
import Markdown from '../../components/Markdown'
import Header from '../../components/Header'
import {
  name,
} from '../../lib/constants'

export default function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
	return <ErrorPage />
  }
  
  return (
	<Container>
		<Header />
		<section className="layout-narrow pt-48">
			<article>
	    		<Markdown post={post} />
			</article>
		</section>
	</Container>
  )
}
// 
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
	'title',
	'slug',
	'date',
	'description',
	'content',
	'extra',
  ], 'blog')

  return {
	props: { post },
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