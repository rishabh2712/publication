const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');

const host = "172.17.121.111";

const config = {
  context: __dirname + "/app",
  entry: [
    './main.js',
    'pdfjs-dist/build/pdf.worker.entry',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://'+ host + ':5000'
  ],
  output: {
      path: __dirname + "/build",
      filename: "[name].bundle.js",
      publicPath: 'http://'+ host + ':5000/assets/'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: true,
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=[path][name].[hash].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: 'font/[hash].[ext]'
        }
      },
      {
        test: /\.ttf$|\.eot$/,
        loader: 'file-loader',
        query: {
          name: 'font/[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
      sourceMap: true,
      mangle: {
        except: ['$']
      }
    })
  ]
};

let app = express();
app.use('/assets', proxy(url.parse('http://'+ host + ':5000/assets')));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + "/build/index.html");
});

let compiler = webpack(config);

let server = new WebpackDevServer(compiler, {
  contentBase: "build",
  hot: true,
  historyApiFallback: false,
  compress: true,
  clientLogLevel: "info",
  quiet: false,
  noInfo: false,
  lazy: false,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: "/assets/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});
server.listen(5000, "0.0.0.0", function() {
  console.log("Dev server started on port 5000");
});
app.listen(5050, "0.0.0.0", function() {
  console.log("Server started on port 5050");
  console.log("Please visit " + host + ":5050/publications");
});
