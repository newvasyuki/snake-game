const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPluginConfig = {
  filename: 'index.html',
  title: 'Game',
  template: 'src/template.html',
  hash: true,
  path: path.resolve(__dirname, 'build'),
};

const MODE = {
  DEV: 'development',
  PROD: 'production',
};

const getOutputConfig = (mode) => ({
  filename: mode === MODE.DEV ? '[name].js' : '[name].[fullhash].js',
  path: path.resolve(__dirname, 'build'),
  publicPath: '/',
});

module.exports = (_, argv) => {
  const mode = argv.mode || MODE.DEV;
  return {
    mode,
    entry: {
      index: './src/index.tsx',
      sw: {
        import: './src/services/serviceWorker/sw.js',
        filename: 'sw.js',
      },
    },
    entry: './src/index.tsx',
    output: getOutputConfig(mode),
    target: 'web',
    devServer: {
      open: false,
      port: 3000,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          use: ['babel-loader', 'ts-loader'],
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
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          //так как Рома не очень понял для чего нужно .react.svg, и те иконки, которые он добавлял
          //не используют этот суффикс, решил объединить оба правила, хотя по факту достаточно было бы одного .svg$/
          test: /\.(react.svg|svg)$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(webp|png|jpe?g|gif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin(htmlPluginConfig)],

    devtool: mode === MODE.DEV ? 'source-map' : false,

    optimization: {
      minimize: mode === MODE.PROD,
    },
  };
};
