import { Tag } from "@markdoc/markdoc";

function checkIfExternal(attributes) {
  const href = attributes.href;
  if (
    href.includes("https://urbit.org") ||
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("?")
  ) {
    return "_self";
  } else {
    return "_blank";
  }
}

export const link = {
  render: "a",
  children: ["strong", "em", "s", "code", "text", "tag"],
  attributes: {
    href: { type: String, required: true },
    title: { type: String },
    target: { type: String },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    const target = checkIfExternal(attributes);

    return new Tag(`a`, { ...attributes, target }, children);
  },
};
