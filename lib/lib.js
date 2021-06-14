import remark from 'remark'
import html from 'remark-html'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import toml from '@iarna/toml'

// export async function markdownToHtml(markdown) {
//   const result = await remark().use(html).process(markdown)
//   return result.toString()
// }

const directories = {
  blog: join(process.cwd(), 'content/blog'),
  events: join(process.cwd(), 'content/events'),
  docs: join(process.cwd(), 'content/docs'),
}

export function getPostSlugs(key) {
  return fs.readdirSync(directories[key])
}

// NB Gavin: This could be much simpler if we converted everything to a more common standard, like YAML
const options = {
  engines: {
    toml: toml.parse.bind(toml),
  },
  language: 'toml',
  delimiters: '+++'
}

export function getPostBySlug(slug, fields = [], key) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(directories[key], `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents, options)
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
  
  // NB Gavin: This could be removed if the TOML engine returned a JSON date (string) instead of a JS Date object. The YAML engine did this parsing by default.
  items.date = JSON.stringify(items.date).replace(/\"/g, '');
  

  return items
}

export function getAllPosts(fields = [], key) {
  const slugs = getPostSlugs(key)
  const posts = slugs
	  .map((slug) => getPostBySlug(slug, fields, key))
	  // sort posts by date in descending order
	  .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  
  return posts
}

// export function dateFormat(d) {
//   const wk = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
//   const mn =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
//   return wk[d.getDay()] + ", " +  mn[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
// }

// export function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// export function generateCrumbs(path) {
//   const crumbs = path.split('/')
//   return crumbs
// 	.filter(v => v !== '')
// 	.map((crumb, index) => ({
// 	  name: capitalize(crumb),
// 	  key: crumb,
// 	  path: crumbs.slice(0, index+2).join('/'),
//   }))
// } 