import remark from 'remark'
import html from 'remark-html'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// export async function markdownToHtml(markdown) {
//   const result = await remark().use(html).process(markdown)
//   return result.toString()
// }

// const postsDirectory = join(process.cwd(), '_projects')
// const processPostsDirectory = join(process.cwd(), '_projects')

const blogDir = join(process.cwd(), 'content/blog')

export function getPostSlugs() {
  return fs.readdirSync(blogDir)
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(blogDir, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
	if (field === 'slug') {
	  items[field] = realSlug
	}
	if (field === 'content') {
	  items[field] = content
	}

	if (data[field]) {
	  items[field] = data[field]
	}
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
	.map((slug) => getPostBySlug(slug, fields))
	// sort posts by date in descending order
	.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function dateFormat(d) {
  const wk = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const mn =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return wk[d.getDay()] + ", " +  mn[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateCrumbs(path) {
  const crumbs = path.split('/')
  return crumbs
	.filter(v => v !== '')
	.map((crumb, index) => ({
	  name: capitalize(crumb),
	  key: crumb,
	  path: crumbs.slice(0, index+2).join('/'),
  }))
} 