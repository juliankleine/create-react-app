const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: '10',
      },
      useBuiltIns: 'usage',
      corejs: '3',
    },
  ],
  '@babel/preset-react',
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
];

module.exports = { presets, plugins };
