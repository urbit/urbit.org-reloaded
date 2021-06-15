import markdownStyles from '../styles/markdown.module.css'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

function P({ children }) {
  return (
	<p className='leading-snug'>
	  {children}
	</p>
  )
}

function Img({ src, children }) {
  return (
	<figure>
	  <img src={src}>
		{children}
	  </img>
	</figure>
  )
}

const options = {
  remarkReactComponents: {
	img: Img,
	// p: P,
  }
}

// Converts markdown strings into markdown HTML/React components
export default function Markdown({ post }) {
  return (
	<div className={markdownStyles['markdown']}>
	  {
		unified()
		  .use(parse)
		  .use(remark2react, options)
		  .processSync(post.content).result
	  }
	</div>
  )
}