import fs from 'fs';
import { glob } from "glob";
import path from 'path';
import matter from "gray-matter";

// import {toml} from 'toml';
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
async function getToml(slug) {
  const toml = require('@iarna/toml')

  const filePath = path.join(POSTS_DIR, slug.endsWith('.md') ? slug : `${slug}.md`);
  const options = {
    engines: {
      toml: toml.parse.bind(toml)
    },
    language: "toml",
    delimiters: "+++"
  };
  const source = fs.readFileSync(filePath, 'utf-8');
  const data = matter(
    source,
    options
  )
  return data;
  // return matter(source)
  // let data = toml.parse(source);
  // return source;
  // return matter(source);
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



export { getMarkdownContent, getPostsTree, getYaml, getToml };

