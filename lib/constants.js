export const contact = {
  name: "Urbit",
  email: "support@urbit.org",
  twitter: "https://twitter.com/urbit",
  github: "https://github.com/urbit/urbit",
  urbitCommunity: "~bitbet-bolbel/urbit-community",
  newsletter:
    "https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&amp;id=be143888d2",
};

export const eventKeys = [
  "title",
  "ends",
  "location",
  "image",
  "registration_url",
  "youtube",
  "description",
  "starts",
  "hosts",
  "slug",
  "guests",
  "content",
  "dark",
  "timezone",
  "darken_image",
];

export const postKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "extra",
];

export const grantsKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "extra",
  "taxonomies",
];

export const mediaKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "extra",
];

export const updatesKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "author",
  "ship",
];

export const footerData = [
  [
    {
      title: "Use Urbit",
      links: [
        {
          title: "Getting Started",
          href: "/getting-started",
        },
        { title: "User's Manual", href: "/using" },
        {
          title: "Urbit Client",
          href: "https://github.com/urbit/port/releases",
        },
        {
          title: "Urbit Binaries",
          href: "https://github.com/urbit/urbit/releases",
        },
        {
          title: "Hosting Providers",
          href: "http://localhost:3000/getting-started/planet#hosting-providers",
        },
      ],
    },
    {
      title: "About",
      links: [
        { title: "What's Urbit?", href: "/understanding-urbit" },
        { title: "Urbit ID", href: "/understanding-urbit/urbit-id" },
        { title: "Urbit OS", href: "/understanding-urbit/urbit-os" },
        { title: "Security Audits", href: "/audits" },
        { title: "FAQ", href: "/faq" },
        { title: "Whitepaper", href: "https://media.urbit.org/whitepaper.pdf" },
      ],
    },
    {
      title: "News",
      links: [
        { title: "Blog", href: "/blog" },
        { title: "Events", href: "/events" },
        { title: "Updates", href: "/updates" },
      ],
    },
    {
      title: "Develop",
      links: [
        { title: "Documentation", href: "/docs" },
        { title: "GitHub", href: "https://github.com/urbit" },
        {
          title: "Airlock APIs",
          href: "https://github.com/urbit/awesome-urbit#http-apis-airlock",
        },
      ],
    },
    {
      title: "Contribute",
      links: [
        {
          title: "Issue Tracker",
          href: "https://github.com/urbit/urbit/issues",
        },
        { title: "Urbit Grants", href: "/grants" },
      ],
    },
    {
      title: "Community",
      links: [
        {
          title: "Dev Mailing List",
          href: "https://groups.google.com/a/urbit.org/g/dev?pli=1",
        },
        { title: "Governance", href: "https://github.com/urbit/azimuth" },
        { title: "Twitter", href: "https://twitter.com/urbit" },
      ],
    },
  ],
  [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: `${contact.email}`, href: `mailto:${contact.email}` },
  ],
];
