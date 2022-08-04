const markdoc = require("@urbit/markdoc");
const themeSwapper = require("tailwindcss-theme-swapper");
const { base, dark } = require("@urbit/foundation-design-system/themes");

module.exports = {
  content: {
    files: [
      "./node_modules/@urbit/foundation-design-system/**/*.js",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./content/**/*.md",
    ],
    transform: {
      md: (content) => {
        const parsed = markdoc.parse(content);
        const transform = markdoc.transform(parsed);
        return markdoc.renderers.html(transform);
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    themeSwapper({
      themes: [
        {
          name: "base",
          selectors: [":root"],
          theme: base,
        },
        {
          name: "dark",
          selectors: [".dark"],
          mediaQuery: "@media (prefers-color-scheme: dark)",
          theme: dark,
        },
      ],
    }),
  ],
};
