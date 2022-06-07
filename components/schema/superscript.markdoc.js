import { Tag } from "@markdoc/markdoc";

export const sup = {
  render: "superscript",
  children: ["strong", "em", "s", "code", "text", "tag"],
  attributes: {},
  transform(node, config) {
    console.log(node);
    return new Tag(
      `sup`,
      node.transformAttributes(config),
      node.transformChildren(config)
    );
  },
};
