// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
// module.exports = {
//     entry: {
//         app: './src/index.js',        
//     },
//     devtool: 'inline-source-map',
//     devServer: {
//         contentBase: './dist',
//         compress: true,
//         port: 9000,
//        // hot: true
//     },
//       module: {
//              rules: [
//                {
//                  test: /\**.css$/,
//                  use: ['style-loader', 'css-loader']
//                }
//              ]
//                        },
//     plugins: [
//          new CleanWebpackPlugin(['dist']),
//         new HtmlWebpackPlugin({
//             title: 'Caching'
//         }),
//         // new HtmlWebpackPlugin({  // Also generate a test.html
//         //     filename: 'view/test.fragment.html',
//         //     template: 'src/view/test.fragment.html'
//         //   }),
//        // new webpack.HotModuleReplacementPlugin()
//        new webpack.HashedModuleIdsPlugin(),

//     ],
//     output: {
//         filename: '[name].[hash].js',        
//         path: path.resolve(__dirname, 'dist')        
//     },
//        optimization: {
//              runtimeChunk: 'single',
//              splitChunks: {
//                cacheGroups: {
//                  vendor: {
//                    test: /[\\/]node_modules[\\/]/,
//                    name: 'vendors',
//                    chunks: 'all'
//                  }
//                }
//              }
//       },
//     mode: "development"
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        index: './src/index.js',
        polyfills: './src/polyfills.js',
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            // {
            // test: require.resolve('./src/index.js'),
            // use: 'imports-loader?this=>window'
            // },
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?file,parse=helpers.parse'
            }
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Shim'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    mode: "development"
};