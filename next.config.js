const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
}

const markdocConfig = {}

module.exports = withMarkdoc(markdocConfig)(nextConfig);
 