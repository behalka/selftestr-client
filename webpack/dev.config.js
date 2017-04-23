const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const dotenv = require('dotenv')
dotenv.config({ silent: false })
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HappyPack = require('happypack')
const config = {
  host: 'localhost',
  port: 3003,
}


const paths = {
  root: path.join(__dirname, '../'),
  dist: path.join(__dirname, '../dist/'),
}

module.exports = {
  devtool: 'inline-eval-cheap-source-map',
  entry: [
    `webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr`,
    'webpack/hot/only-dev-server', // k cemu je tohle?
    './src/assets/css/base.styl', // todo: bude tohle ?
    './src/init.js',
  ],
  output: {
    path: paths.dist,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    /* for HtmlWebpack plugin */
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        happy: { id: 'jsx' }, // id musi sedet
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10240?name=img/[name].[ext]'
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'style-loader!css-loader!postcss!stylus-loader'
      }
    ]
  },
  postcss: function() {
    return [ autoprefixer({ browsers: ['last 2 versions' ]})]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: paths.root,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: JSON.stringify(process.env.API_HOST),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      id: 'jsx',
      threads: 5,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
  }
}
