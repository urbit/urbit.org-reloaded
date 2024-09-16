import fs from 'fs';
import { glob } from "glob";
import path from 'path';
import matter from "gray-matter";
import Markdoc from '@markdoc/markdoc';
import { markdocConfig } from '../markdocConfig';

const ARTICLES_PATH = "/app/docs";
const POSTS_DIR = path.join(process.cwd(), ARTICLES_PATH);

async function getPostsTree() {
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'));
  // console.log('pp', postPaths)
  return postPaths.map(postPath => {
      return { slug: path.basename(postPath, path.extname(postPath)) }
  });
}


async function getMarkdownContent(slug) {

  const filePath = path.join(POSTS_DIR, slug);
  const source = fs.readFileSync(filePath, 'utf-8');
  const matterResult = matter(source);
  const postMeta = matterResult.data;
  // console.log(matter(source).data.metadata.title)
  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(ast, markdocConfig);
  // return { content, title };
  return {source, content, postMeta};
}


export { getMarkdownContent, getPostsTree };

