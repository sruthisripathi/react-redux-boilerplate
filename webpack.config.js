const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEPENDENCY_LIBS = [
  'react',
  'redux',
  'react-dom',
  'react-redux',
  'esri-loader',
  'reactstrap'
];

const config = {
    entry: {
        bundle: './src',
        depends: DEPENDENCY_LIBS
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js'
    },
    resolve: {
      modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
      descriptionFiles: ['package.json'],
      extensions: ['.js'],
    },
    module: {
        rules: [
            {
                use: ['babel-loader', 'eslint-loader'],
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['depends', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
      inline: true,
      port: 8080
    },
};

module.exports = config;
