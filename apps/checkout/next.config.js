// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// module.exports = {
//   plugins: [new NodePolyfillPlugin()],

//   webpack: (config) => {
//     // Include polyfill for https module if building for the client-side

//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       https: require.resolve("https-browserify"),
//       querystring: require.resolve("querystring-es3"),
//     };

//     return config;
//   },
// };

// module.exports = {
//   target: "node",
//   webpack: (config, { isServer }) => {
//     // Exclude polyfill for http module if building for the client-side
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         http: false,
//         https: false,
//         fs: false,
//         tls: false,
//         net: false,
//         path: false,
//         zlib: false,
//         http: false,
//         https: false,
//         stream: false,
//         crypto: false,
//         querystring: false,
//       };
//     }
//     return config;
//   },
// };

module.exports = {
  resolve: {
    fallback: {
      http: false,
      https: false,
      querystring: false,
    },
  },
};
