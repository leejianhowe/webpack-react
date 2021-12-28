import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

const config = {
  // tells app to be bundled for production or development
  mode: "development",
  entry: "./src/index.tsx",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    // adds type checking into the webpack process
    // throws type error if found
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // Adding linting into the webpack process
    // throws linting error if found
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
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
  /**
   * The resolve.extensions field tells Webpack what file types to
   * look for in which order during module resolution. We need to tell it to
   * look for TypeScript files as well as JavaScript files.
   */
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
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

export default config