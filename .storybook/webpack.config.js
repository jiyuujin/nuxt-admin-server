const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    },
    {
      test: /\.(ts|tsx)?(\.erb)?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }]
    }
  );

  config.resolve.alias['@'] = rootPath;
  config.resolve.alias['~'] = rootPath;
  config.resolve.alias['vue'] = 'vue/dist/vue.esm.js';

  config.resolve.extensions.push('.ts', '.tsx');

  return config
}
