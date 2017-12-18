// @ts-check
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** プロジェクトのディレクトリ規約はこうやってまとめておくと便利。 */
const project = {
  base(...args) {
    return path.join(__dirname, ...args);
  },
  src(...args) {
    return this.base("src", ...args);
  },
  dist(...args) {
    return this.base("dist", ...args);
  }
};

module.exports = {
  entry: project.src("index.tsx"),
  output: {
    path: project.dist(),
    filename: "app.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    modules: [project.base("node_modules"), project.src()],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: project.src("index.html")
    })
  ]
};
