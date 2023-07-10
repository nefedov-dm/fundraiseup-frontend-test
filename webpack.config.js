const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TSConfigPathWebpackPlugin = require("tsconfig-paths-webpack-plugin");

const sourceFolder = path.resolve(__dirname, "src");
const outputFolder = path.resolve(__dirname, "dist");

module.exports = (env, argv) => ({
  entry: path.resolve(sourceFolder, "index.ts"),
  output: {
    path: outputFolder,
    filename: "main.js",
  },
  devtool: argv.mode === "development" ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(sourceFolder, "index.html"),
    }),
  ],
  resolve: {
    plugins: [new TSConfigPathWebpackPlugin()],
    extensions: [".ts", ".js"],
  },
  devServer: {
    static: {
      directory: outputFolder,
    },
    port: 9000,
  },
});
