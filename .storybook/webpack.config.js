const path = require('path')
module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.s?css$/,
      loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loaders: ['file-loader'],
      include: path.resolve(__dirname, '../')
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
  )

  config.resolve.alias['@'] = path.resolve(__dirname, '../')
  config.resolve.alias['~'] = path.resolve(__dirname, '../')

  return config;
};
