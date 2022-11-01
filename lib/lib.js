import fs from "fs";
import { join, parse } from "path";
import matter from "gray-matter";
import toml from "@iarna/toml";
import { DateTime } from "luxon";
import { getPostBySlug, getPostSlugs } from "@urbit/foundation-design-system";

// NB Gavin: This could be much simpler if we converted everything to a more common standard, like YAML
const options = {
  engines: {
    toml: toml.parse.bind(toml),
  },
  language: "toml",
  delimiters: "+++",
};

const directories = (dir) => {
  switch (dir) {
    case "blog":
      return join(process.cwd(), "content/blog");
    case "events":
      return join(process.cwd(), "content/events");
    case "docs":
      return join(process.cwd(), "content/docs");
    case "grants":
      return join(process.cwd(), "content/grants");
    case "media":
      return join(process.cwd(), "content/media");
    case "updates":
      return join(process.cwd(), "content/updates");
    case "/":
      return join(process.cwd(), "content");
    default:
      return join(process.cwd(), `content/${dir}`);
  }
};

export function getAllPosts(fields = [], key, sort = "") {
  const slugs = getPostSlugs(key);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, key))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      if (sort === "date") {
        return DateTime.fromISO(post1.date) > DateTime.fromISO(post2.date)
          ? -1
          : 1;
      } else if (sort === "weight") {
        return post1.weight > post2.weight ? -1 : 1;
      }
    });
  return posts;
}

export function getAllEvents(fields = [], key) {
  const slugs = getPostSlugs(key);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, key))
    // sort posts by date in descending order
    .sort((post1, post2) =>
      DateTime.fromISO(post1.starts) > DateTime.fromISO(post2.starts) ? -1 : 1
    );
  return posts;
}

function getAllPaths(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllPaths(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

export function getDocsPaths() {
  return getAllPaths(directories("docs"), []);
}

export function formatDateWithTime(d) {
  const date = DateTime.fromISO(d, {
    setZone: true,
  }).toLocaleString(DateTime.DATETIME_FULL);
  return date;
}

// Formats a DateTime object to something like "July 15, 2021, 5:00 PM"
export function formatDateAndTime(dateTimeObject) {
  return dateTimeObject.toLocaleString(DateTime.DATETIME_HUGE);
}

// Returns an array of unique grants categories
export function getGrantsCategories() {
  const years = fs.readdirSync(directories("grants"), { withFileTypes: true }).filter((f) => f.isDirectory());
  const uniqueCategories = Array.from(new Set(years.map((yearDir) => {
    return fs.readdirSync(join(directories("grants"), yearDir.name), { withFileTypes: true })
      .filter((path) => parse(path.name).ext === ".md")
      .map((path) => matter(fs.readFileSync(join(directories("grants"), yearDir.name, path.name)), options))
      .flat()
      .reduce((acc, metadata) => {
        return [...acc, ...metadata.data.taxonomies.grant_category]
      }, [])
  }).flat()));
  return uniqueCategories;
}

// Returns an array of unique grants types

export function getGrantsTypes() {
  const years = fs.readdirSync(directories("grants"), { withFileTypes: true }).filter((f) => f.isDirectory());
  const uniqueTypes = Array.from(new Set(years.map((yearDir) => {
    return fs.readdirSync(join(directories("grants"), yearDir.name), { withFileTypes: true })
      .filter((path) => parse(path.name).ext === ".md")
      .map((path) => matter(fs.readFileSync(join(directories("grants"), yearDir.name, path.name)), options))
      .flat()
      .reduce((acc, metadata) => {
        return [...acc, ...metadata.data.taxonomies.grant_type]
      }, [])
  }).flat()));
  return uniqueTypes;
}

// Grab which directory the grant post is in

export function getGrantYear(slug) {
  const basePath = join(process.cwd(), 'content/grants')
  const years = fs.readdirSync(basePath, { 'withFileTypes': true }).filter((f) => f.isDirectory());
  const dir = years.find((year) => {
    const yearDir = fs.readdirSync(join(basePath, year.name), { 'withFileTypes': true });
    return yearDir.some((file) => file.name === `${slug}.md`)
  });
  return dir;
}

export function getGrantByShortcode(shortcode) {
  const basePath = join(process.cwd(), 'content/grants')
  const years = fs.readdirSync(basePath, { 'withFileTypes': true }).filter((f) => f.isDirectory());
  let found = null
  const dir = years.find((year) => {
    const yearDir = fs.readdirSync(join(basePath, year.name), { 'withFileTypes': true });
    const foundFile = yearDir.find((file) => {
      const { data } = matter(fs.readFileSync(join(basePath, year.name, file.name)), options);
      return data?.extra?.deliverable === shortcode.join("/")
    })
    found = foundFile;
    return foundFile
  });
  return found?.name?.replace(".md", "");
}

// Groups arrays into an array of arrays with 2 members
export const pair = (arr) =>
  arr.reduce(function (rows, key, index) {
    return (
      (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);
