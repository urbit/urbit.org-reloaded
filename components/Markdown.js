import markdownStyles from "../styles/markdown.module.css";
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import RemarkLowlight from "remark-react-lowlight";
import codeblocks from "remark-code-blocks";
import bash from "highlight.js/lib/languages/bash";
import sh from "highlight.js/lib/languages/shell";
import js from "highlight.js/lib/languages/javascript";
import c from "highlight.js/lib/languages/c";
import http from "highlight.js/lib/languages/http";
import sanitizeGhSchema from "hast-util-sanitize/lib/github.json";
import merge from "deepmerge";
import "highlight.js/styles/idea.css";
import slug from "remark-slug";
import heading from "remark-heading-id";

function P({ children }) {
  return <p className="leading-snug">{children}</p>;
}

// img is wrapped in figure so that images can be extra wide in the blog posts
function Img({ src, children }) {
  return (
    <figure>
      <img src={src}>{children}</img>
    </figure>
  );
}

const options = {
  remarkReactComponents: {
    img: Img,
    code: RemarkLowlight({ bash, sh, js, c, http }),
    // p: P,
  },
  sanitize: merge(sanitizeGhSchema, {
    clobberPrefix: "",
    attributes: { code: ["className"] },
  }),
};

// Converts markdown strings into markdown HTML/React components
export default function Markdown({ post }) {
  return (
    <div className={markdownStyles["markdown"]}>
      {
        unified()
          .use(parse)
          .use(slug)
          .use(heading)
          .use(remark2react, options)
          .processSync(post.content).result
      }
    </div>
  );
}
