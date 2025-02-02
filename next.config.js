const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
  darkMode: 'class',
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
}

const markdocConfig = {
  schemaPath: "./app/schema"
}

module.exports = withMarkdoc(markdocConfig)(nextConfig);
