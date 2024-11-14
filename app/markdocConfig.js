import {
  OverviewSection,
  OverviewSVG,
  OverviewImage,
} from "./components/OverviewSection";
import { FaqSection } from "./components/Faq";
import { IconCard } from "./components/IconCard";
import { LineBreak } from "./components/LineBreak";
import { MarkdocLink, UnescapedHtml } from "./components/MarkdocComponents";

const markdocConfig = {
  nodes: {
    paragraph: {
      render: "p",
    },
    heading: {
      render: "h1",
      attributes: {
        level: { type: String },
      },
    },
    link: {
      render: MarkdocLink,
      attributes: {
        href: { type: String },
      },
    },
  },
  tags: {
    "overview-section": {
      render: OverviewSection,
      attributes: {
        title: { type: String },
      },
    },
    "br": {
      render: LineBreak
    },
    "iconcard": {
      render: IconCard,
      attributes: {
        title: { type: String },
        description: {type: String},
        label: {type: String},
        href: {type: String},
        icon: {type: String},
        small: {type: Boolean},
      },
    },
    "faqSection": {
      render: FaqSection,
      attributes: {
        question: { type: String },
      }
    },
    graphic: {
      render: OverviewSVG,
      attributes: {
        src: { type: String },
        alt: { type: String },
      },
    },
    image: {
      render: OverviewImage,
      attributes: {
        src: { type: String },
        alt: { type: String },
      },
    },
    // html: {
    //   render: UnescapedHtml,
    //   attributes: {
    //     htmlWrapperTag: { type: String },
    //     children: { type: String },
    //   },
    // },
    // "html-tag": {
    //     attributes: {
    //       name: { type: String, required: true },
    //       attrs: { type: Object },
    //     },
    //     transform(node, config) {
    //       const { name, attrs } = node.attributes;
    //       const children = node.transformChildren(config);
    //       return new Markdoc.Tag(name, attrs, children);
    //     },
    //   },
  },
};

const components = {
  Paragraph: ({ children }) => {
    return <div className="text-base pb-2">{children}</div>;
  },
};

export { markdocConfig, components };
