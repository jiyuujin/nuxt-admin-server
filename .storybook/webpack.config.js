const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    }
  );

  config.resolve.alias['@'] = rootPath;
  config.resolve.alias['~'] = rootPath;
  config.resolve.alias['vue'] = 'vue/dist/vue.esm.js';

  return config
}
