const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPluginConfig = {
  filename: "index.html",
  title: "Game",
  template: "src/template.html",
  hash: true,
  path: path.resolve(__dirname, "build"),
};

const MODE = {
  DEV: "development",
  PROD: "production",
};

const getOutputConfig = (mode) => ({
  filename: mode === MODE.DEV ? "[name].js" : "[name].[fullhash].js",
  path: path.resolve(__dirname, "build"),
  publicPath: '/',
});

module.exports = (_, argv) => {
  const mode = argv.mode || MODE.DEV;
  return {
    mode,
    entry: "./src/index.tsx",
    output: getOutputConfig(mode),
    target: "web",
    devServer: {
      open: false,
      port: 3000,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: "/node_modules/",
          use: ["babel-loader", "ts-loader"],
        },
        {
          test: /\.pcss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(webp|png|jpe?g|gif)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin(htmlPluginConfig)],

    devtool: mode === MODE.DEV ? "source-map" : false,

    optimization: {
      minimize: mode === MODE.PROD,
    },
  };
};
