const path = require('path');
const autoprefixer = require('autoprefixer');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const makePath = to => path.resolve(__dirname, to);

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index.jsx',
  ],
  output: {
    filename: 'bundle.js',
    path: makePath('public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  forceAllTransforms: true,
                  useBuiltIns: 'entry',
                  targets: {
                    browsers: [
                      'last 1 versions',
                      'Chrome >= 48',
                      'ie >= 11',
                    ],
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
            },
          },
          { loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer(),
                postcssPresetEnv({
                  features: {
                    'nesting-rules': true,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      Lib: makePath('src/lib/'),
      Com: makePath('src/components/'),
      Actions: makePath('src/actions/'),
      Reducers: makePath('src/reducers/'),
      Config: makePath('src/config'),
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/,
        transformFn(dirName) {
          return [dirName, dirName.toLowerCase()];
        },
      }),
    ],
  },
};
