module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
    {
      "source": "/install/linux-aarch64/latest",
      "destination": "https://github.com/urbit/vere/releases/latest/download/linux-aarch64.tgz",
      "permanent": true
    },
    {
      "source": "/install/linux-x86_64/latest",
      "destination": "https://github.com/urbit/vere/releases/latest/download/linux-x86_64.tgz",
      "permanent": true
    },
    {
      "source": "/install/macos-aarch64/latest",
      "destination": "https://github.com/urbit/vere/releases/latest/download/macos-aarch64.tgz",
      "permanent": true
    },
    {
      "source": "/install/macos-x86_64/latest",
      "destination": "https://github.com/urbit/vere/releases/latest/download/macos-x86_64.tgz",
      "permanent": true
    },
    ];
  },
  // target: 'serverless',
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: "path-browserify",
        events: false,
      };
    }
    if (isServer) {
      config.externals.push("_http_common");
    }
    config.resolve.alias.stream = "stream-browserify";
    config.resolve.alias.zlib = "browserify-zlib";
    // config.externals = {
    //   ...config.externals,
    //   canvas: "util",
    //   bufferutil: "bufferutil",
    //   "utf-8-validate": "utf-8-validate"
    // }
    return config;
  },
};
