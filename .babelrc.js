const presets = [
  '@babel/preset-react',
  '@babel/preset-typescript',
  [
    '@babel/preset-env',
    {
      targets: 'defaults',
    },
  ],
];
const plugins = ['@babel/transform-runtime'];

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-hot-loader/babel');
}

module.exports = { presets, plugins };
