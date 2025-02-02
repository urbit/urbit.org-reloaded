const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
  darkMode: 'class',
  // removed output: 'export'
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  async redirects() {
    return [
      {
        source: "/install/linux-aarch64/latest",
        destination: "https://github.com/urbit/vere/releases/latest/download/linux-aarch64.tgz",
        permanent: true
      },
      {
        source: "/install/linux-x86_64/latest",
        destination: "https://github.com/urbit/vere/releases/latest/download/linux-x86_64.tgz",
        permanent: true
      },
      {
        source: "/install/macos-aarch64/latest",
        destination: "https://github.com/urbit/vere/releases/latest/download/macos-aarch64.tgz",
        permanent: true
      },
      {
        source: "/install/macos-x86_64/latest",
        destination: "https://github.com/urbit/vere/releases/latest/download/macos-x86_64.tgz",
        permanent: true
      },
    ];
  },
}

const markdocConfig = {
  schemaPath: "./app/schema"
}

module.exports = withMarkdoc(markdocConfig)(nextConfig);
