import { Config } from "@markdoc/markdoc";
// import Callout from "./(blog.components)/callout";
// import Heading from "./(blog.components)/heading";

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
            render: 'a',
            attributes: {
                href: { type: String }
            }
        },
    },
   
};

const components = {
    Paragraph: ({ children }) => {
        return <div className="text-base pb-2">{children}</div>
    },
    // Heading: Heading,
    // Callout: Callout
};

export { markdocConfig, components }