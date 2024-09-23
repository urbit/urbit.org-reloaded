import fs from 'fs';
import { glob } from "glob";
import path from 'path';
import matter from "gray-matter";
import Markdoc from '@markdoc/markdoc';
import { markdocConfig } from '../markdocConfig';

const ARTICLES_PATH = "/app/docs";
const POSTS_DIR = path.join(process.cwd(), ARTICLES_PATH);

async function getPostsTree(specificPath = '' ) {
  const postPaths = await glob(path.join(POSTS_DIR, specificPath, '**/*.md'));
  return postPaths?.map(postPath => {
      const slug = path.basename(postPath, path.extname(postPath));
      const relativePathWithoutExt = path.relative(POSTS_DIR, postPath).replace(/\.md$/, '');
      return { 
        slug: slug,
        fullPath: postPath,
        relativePath: relativePathWithoutExt
        
      }
  });
}

async function getYaml(slug) {
  const filePath = path.join(POSTS_DIR, slug.endsWith('.md') ? slug : `${slug}.md`);
  const source = fs.readFileSync(filePath, 'utf-8');
  return matter(source);
}


async function getMarkdownContent(slug) {
  // Ensure slug ends with .md
  const filePath = path.join(POSTS_DIR, slug.endsWith('.md') ? slug : `${slug}.md`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const matterResult = matter(source);
  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(ast, markdocConfig);
  return {
    source, 
    content, 
    frontMatter: matterResult.data
  };
}



export { getMarkdownContent, getPostsTree, getYaml };

