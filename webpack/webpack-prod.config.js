const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const context = path.resolve(__dirname, '../client');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

const incstr = require('incstr');

const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789'
  });

  return (name) => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      // Class name cannot start with a number.
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = generateNextId();

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1);

  return `${uniqueIdGenerator(componentName)}_${uniqueIdGenerator(localName)}`;
};

const config = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash]-[chunkhash].js',
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
              presets: ['es2015', 'react'],
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
              importLoaders: 1,
              minimize: true,
              modules: true
            }
          },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader' },
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
    new CleanPlugin([path.resolve('dist')], { root: path.resolve(__dirname, '../') }),
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin({
      parallel: {
        cache: true,
        workers: 2 // for e.g
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        env: '"production"',
        NODE_ENV: '"production"',
      }
    })
  ]
};

module.exports = (env) => {
  if (env.eslint !== 'false') {
    config.module.loaders[0].use.push({ loader: 'eslint-loader' });
  }

  return config;
};
