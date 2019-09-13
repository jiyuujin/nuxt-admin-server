const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'thread-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            happyPackMode: true
          }
        },
        {
          loader: 'cache-loader',
          options: {
            cacheDirectory: path.resolve(
              __dirname,
              'node_modules/.cache/cache-loader'
            )
          }
        }
      ]
    }
  )

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      watch: path.resolve(__dirname, '../stories'),
      workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
    })
  )
  config.plugins.push(
    new HardSourceWebpackPlugin()
  )

  config.resolve.alias['@'] = path.dirname(path.resolve(__dirname))
  config.resolve.alias['~'] = path.dirname(path.resolve(__dirname))

  return config
}
