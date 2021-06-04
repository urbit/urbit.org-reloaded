import { useRouter } from 'next/router'
import { getPostBySlug, getAllPosts, markdownToHtml } from '../../lib/lib'
import Head from 'next/head'
import ErrorPage from '../404'
import Container from '../../components/Container'
import Markdown from '../../components/Markdown'
import {
  name,
} from '../../lib/constants'

export default function Post({ project }) {
  const router = useRouter()
  if (!router.isFallback && !project?.slug) {
	return <ErrorPage />
  }
  return (
	<Container>
	  <Markdown post={project} />
	</Container>
  )
}

export async function getStaticProps({ params }) {
  const project = getPostBySlug(params.slug, [
	'title',
	'date',
	'subtitle',
	'content',
	'slug',
  ])

  return {
	props: { project },
  }
}

export async function getStaticPaths() {
  const projects = getAllPosts(['slug'])

  return {
	paths: projects.map((post) => {
	  return {
		params: {
		  slug: post.slug,
		},
	  }
	}),
	fallback: false,
  }
}