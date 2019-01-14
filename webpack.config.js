const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const webpack = require('webpack');
module.exports = {
    entry: {
        'index': './src/scripts/main.mjs',
        'app':'./src/scripts/app.mjs'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        // compress: true,
        port: 9000,
        hot: true
    },
    module: {
        noParse: /jquery|lodash/,
        rules: [           
            {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
              },
              {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  'style-loader' ,
                  MiniCssExtractPlugin.loader,
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  {
                    // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                      plugins: function () {
                        return [
                          require('autoprefixer')
                        ];
                      }
                    }
                  },
                  'sass-loader',
                ],
              },
            //   {
            //     test: /\.s?[ac]ss$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         { loader: 'css-loader', options: { url: false, sourceMap: true } },
            //         { loader: 'sass-loader', options: { sourceMap: true } }
            //     ],
            // },
              // {
              //   test: /\*.scss$/,
              //   use: [
              //     "style-loader",
              //     MiniCssExtractPlugin.loader,
              //     "css-loader",
              //     "sass-loader"
              //   ]
              // }
            // {
            // test: require.resolve('./src/index.js'),
            // use: 'imports-loader?this=>window'
            // },
            // {
            //     test: require.resolve('./src/globals.js'),
            //     use: 'exports-loader?file,parse=helpers.parse'
            // }
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    // optimization: {
    //     splitChunks: {
    //       chunks: 'async',
    //       minSize: 30000,
    //       maxSize: 0,
    //       minChunks: 1,
    //       maxAsyncRequests: 5,
    //       maxInitialRequests: 3,
    //       automaticNameDelimiter: '~',
    //       name: true,
    //       cacheGroups: {
    //         vendors: {
    //           test: /[\\/]node_modules[\\/]/,
    //           priority: -10
    //         },
    //         default: {
    //           minChunks: 2,
    //           priority: -20,
    //           reuseExistingChunk: true
    //         }
    //       }
    //     }
    //   },
    plugins: [       
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'MI Webpack',
            template:"src/index.html",
            inject: true,
            chunks:['index'],
        }),
        new HtmlWebpackPlugin({  // Also generate a test.html
            inject: false,
            filename: 'app.html',
            template:"src/app.html",
            title: 'MI App',
            mViewPort: `width=device-width, initial-scale=1.0`,
             chunks:['app'],
            "files": {
                "css": [ "custom.css" ],
                "js": ["index","app"],
                "chunks": {                                      
                  "main": {
                    "entry": "app",
                    "css": "css"
                  },
                }
              }
           
        }),        
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css' ,
        }),
        new CopyWebpackPlugin([
            { from: 'src/view/*.html', to: '',toType:'dir',
            transformPath (targetPath, absolutePath) {
                //remove src at the beginning 
              console.log (targetPath.substring(4));
              return targetPath.substring(4);
            }
            }
          ]),
        new webpack.HotModuleReplacementPlugin(),
    ]
};