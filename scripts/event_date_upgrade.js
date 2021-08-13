const fs = require("fs");
const matter = require("gray-matter");
const toml = require("@iarna/toml");
const path = require("path");
const { DateTime } = require("luxon");

const dir = path.join(process.cwd(), "../content/events");

const options = {
  // engines: {
  // 	toml: toml.parse.bind(toml),
  // 	toml: toml.stringify.bind(toml),
  // },
  engines: {
    toml: {
      parse: toml.parse.bind(toml),
      stringify: toml.stringify.bind(toml),
    },
  },
  language: "toml",
  delimiters: "+++",
};

fs.readdirSync(dir, { withFileTypes: true })
  .filter((f) => f.isFile() && f.name !== "_index.md")
  .map((f, i) => {
    const fileContents = matter(
      fs.readFileSync(path.join(dir, f.name)),
      options
    );
    // This uses your default system timezone, so if you are not in 'America/Los_Angeles' the output will be incorrect.
    const starts = DateTime.fromSeconds(fileContents.data.starts).toISO();
    const ends = DateTime.fromSeconds(fileContents.data.ends).toISO();

    fileContents.data.starts = starts;
    fileContents.data.ends = ends;

    const data = matter.stringify(
      fileContents.content,
      fileContents.data,
      options
    );

    // fs.writeFileSync(path.join(dir, f.name), data);
  });
