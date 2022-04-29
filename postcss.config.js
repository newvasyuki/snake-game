module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    [
      'postcss-preset-env',
      {
        browsers: 'last 2 versions',
      },
    ],
  ]
};