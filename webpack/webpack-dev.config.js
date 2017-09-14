const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1);

  return `${componentName}_${localName}`;
};

const context = path.resolve(__dirname, '../client');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

const config = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, '../client'),
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2017', 'react'],
              plugins: [
                'transform-object-rest-spread',
                'transform-react-jsx',

                [
                  'react-css-modules',
                  {
                    context,
                    filetypes: {
                      '.scss': {
                        syntax: 'postcss-scss'
                      }
                    },
                    generateScopedName
                  }
                ]
              ]
            }
          },
        ],
        exclude: /node_modules/
      },
      {
        include: path.resolve(__dirname, '../client'),
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              getLocalIdent: (contextParam, localIdentName, localName) => (
                generateScopedName(localName, contextParam.resourcePath)
              ),
              importLoaders: 2,
              modules: true,
              sourceMap: true
            }
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          },
          {
            loader: 'autoprefixer-loader',
            options: {
              browsers: 'last 4 version'
            }
          },
        ],
        test: /\.scss?$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=[name].[ext]' },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      process: { env: '"development"' }
    })
  ]
};

module.exports = (env) => {
  if (env.eslint !== 'false') {
    config.module.loaders[0].use.push({ loader: 'eslint-loader' });
  }

  return config;
};
