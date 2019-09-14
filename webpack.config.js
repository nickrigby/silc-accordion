const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractSass = new MiniCssExtractPlugin({
  filename: "index.css"
});

const config = {
  entry: "./src/js/demo.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    extensions: [".js", ".json", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss"
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: {
          limit: 1000
        }
      }
    ]
  },
  plugins: [extractSass]
};

if (process.env.NODE_ENV !== "production") {
  config.devServer = {
    hot: true,
    publicPath: "/build/",
    port: 9001,
    quiet: false
  };

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
