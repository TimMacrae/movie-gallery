const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development", // or "production"
  entry: "./app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false, // Exclude 'fs'
      child_process: false, // Exclude 'child_process'
      net: false, // Exclude 'net'
      tls: false, // Exclude 'tls'
      dns: false, // Exclude 'dns'
      process: require.resolve("process/browser"), // Polyfill 'process'
      nock: false, // Exclude 'nock'
      "aws-sdk": false, // Exclude 'aws-sdk'
      "mock-aws-s3": false, // Exclude 'mock-aws-s3'
      async_hooks: false,
      npm: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.cs$/,
        use: "ignore-loader", // Ignore .cs files
      },
      {
        test: /\.html$/,
        use: "ignore-loader", // Ignore .html files in node-gyp directories
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(), // Add the polyfill plugin here,
    new webpack.IgnorePlugin({
      resourceRegExp: /bcrypt|node-pre-gyp|async_hooks|npm|aws-sdk|mock-aws-s3/, // Ignore specific dynamic requires
    }),
  ],
};
