module.exports = {
  presets: [require("@urbit/foundation-design-system/tailwind.config")],
  content: {
    files: [
      "./node_modules/@urbit/foundation-design-system/dist/**/*.js",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./content/**/*.md",
    ],
  },
};
