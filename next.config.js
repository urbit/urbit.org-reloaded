// For exporting sigil pngs on Vercel, see https://github.com/Automattic/node-canvas/issues/1779#issuecomment-895885846
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
}

module.exports = {
  reactStrictMode: false,
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
