const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  // tells app to be bundled for production or development
  mode: "development",
  entry: "./src/index.tsx",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    // tells webpack to wait for typecheck
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 3000,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        // matches files with .mjs/.js
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              /**
               * used to check compatibility
               * for backward compatibility and polyfills
               * for commonly used browser versions
               * */
              "@babel/preset-env",
              /**
               * React 17
               * do not need to import react
               * new jsx transform
               * https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup
               * https://babeljs.io/docs/en/babel-preset-react
               */

              ["@babel/preset-react", { runtime: "automatic" }],
              /**
               * @babel/preset-typescript: This is a plugin that
               * enables Babel to transform TypeScript code into JavaScript.
               */
              "@babel/preset-typescript",
            ],
            /**
             * @babel/plugin-transform-runtime and
             * @babel/runtime: These are plugins that allow us to use the async and await JavaScript features.
             */
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
