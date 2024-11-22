const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      inherits: require.resolve("inherits") // P799e
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
