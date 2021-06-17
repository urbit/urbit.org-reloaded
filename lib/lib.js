import remark from "remark";
import html from "remark-html";
import fs from "fs";
import { join, parse } from "path";
import matter from "gray-matter";
import toml from "@iarna/toml";

// export async function markdownToHtml(markdown) {
//   const result = await remark().use(html).process(markdown)
//   return result.toString()
// }

const directories = {
  blog: join(process.cwd(), "content/blog"),
  events: join(process.cwd(), "content/events"),
  docs: join(process.cwd(), "content/docs"),
};

export function getPostSlugs(key) {
  return fs.readdirSync(directories[key]);
}

// NB Gavin: This could be much simpler if we converted everything to a more common standard, like YAML
const options = {
  engines: {
    toml: toml.parse.bind(toml),
  },
  language: "toml",
  delimiters: "+++",
};

export function getPostBySlug(slug, fields = [], key) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(directories[key], `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents, options);
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  // NB Gavin: This could be removed if the TOML engine returned a JSON date (string) instead of a JS Date object. The YAML engine did this parsing by default.
  items.date = JSON.stringify(items.date).replace(/\"/g, "");

  return items;
}

export function getAllPosts(fields = [], key) {
  const slugs = getPostSlugs(key);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, key))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getNextPost(slug, fields = [], key) {
  let resultPost = null;

  getAllPosts(fields, key).forEach((post, index, array) => {
    if (post.slug === slug) {
      resultPost = array[index - 1];
    }
  });
  return resultPost;
}

export function getPreviousPost(slug, fields = [], key) {
  let resultPost = null;

  getAllPosts(fields, key).forEach((post, index, array) => {
    if (post.slug === slug) {
      resultPost = array[index + 1];
    }
  });
  return resultPost;
}

export function formatDate(d) {
  // const wk = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const mn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return mn[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

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

export const getAllFiles = function (dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

function get(obj, path, defaultValue) {
  for (const index of path) {
    if (obj[index] === undefined) {
      return defaultValue;
    }
    obj = obj[index];
  }
  return obj;
}

function set(obj, path, value) {
  let piece = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (piece[path[i]] === undefined) {
      piece[path[i]] = typeof path[i + 1] === "number" ? [] : {};
    }
    piece = piece[path[i]];
  }
  piece[path[path.length - 1]] = value;
  return obj;
}

/**
 * buildPageTree is written to provide a recursive index of posts
 * for nested directories for creating sidebars
 * @param {string} path Absolute path to the subdirectory.
 * @returns {Object.<string,string|Object<string,string[]|number>>} Title of the directory, child pages, and child directories (recursive structure).
 *
 */

// type PageTree =
//   { title: string,
//     pages: [{
//       title: string,
//       base: string,
//       slug: string,
//       weight: number,
//     }],
//     children: { [string]: PageTree },
//   }

export function buildPageTree(path) {
  const metadata = matter(fs.readFileSync(join(path, "_index.md")), options);

  const children = fs.readdirSync(path, { withFileTypes: true });
  const pages = children.filter((f) => f.isFile() && f.name !== "_index.md");
  const subdirs = children.filter((f) => f.isDirectory());

  return {
    title: metadata.data.title,
    pages: pages.map((page) => {
      const { data: pageData } = matter(
        fs.readFileSync(join(path, page.name)),
        options
      );
      return {
        title: pageData.title,
        base: page.name,
        slug: page.name.replace(/.md$/, ""),
        weight: pageData?.weight ?? 0,
      };
    }),
    children: Object.fromEntries(
      subdirs.map((subdir) => [
        subdir.name,
        buildPageTree(join(path, subdir.name)),
      ])
    ),
  };
}
