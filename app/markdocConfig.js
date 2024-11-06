import { Config } from "@markdoc/markdoc";
// import Callout from "./(blog.components)/callout";
// import Heading from "./(blog.components)/heading";
import {OverviewSection, OverviewSVG, OverviewImage } from "./components/OverviewSection";
import { MarkdocLink } from "./components/MarkdocLink";

const markdocConfig = {
    nodes: {
        paragraph: {
            render: 'p'
        },
        heading: {
            render: 'h1',
            attributes: {
                level: { type: String }
            }
        },
        link: {
            render: MarkdocLink,
            attributes: {
                href: { type: String }
            }
        },
        
    },
    tags: {
        'overview-section': {
            render: OverviewSection,
            attributes: {
                title: { type: String },
            }
        },
        'graphic': {
            render: OverviewSVG,
            attributes: {
                src: { type: String },
                alt: { type: String }
            }
        },
        'image': {
            render: OverviewImage,
            attributes: {
                src: { type: String },
                alt: { type: String }
            }
        }

    }
   
};

const components = {
    Paragraph: ({ children }) => {
        return <div className="text-base pb-2">{children}</div>
    },
    // Heading: Heading,
    // Callout: Callout
};



export { markdocConfig, components }