const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');

// if (process.env.NODE_ENV === 'production') 

module.exports = {
    entry: {
        'index': './src/scripts/main.mjs',
        'app':'./src/scripts/app.mjs'
    },
    
    devServer: {
        contentBase: './dist',
        publicPath:'/',
        inline: true,
        // compress: true,
        port: 9000,
        hot: true
    },
    // devtool: 'source-map',
    module: {
        
        rules: [     
          {
            test: /\.(css|s[ac]ss)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: true
                }
              },      
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer'),
                    require('cssnano')({
                        preset: 'default',
                    })
                  ],
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },      
          // {
          //   test: /\.(scss)$/,
          //   use: [
          //     {
          //       // Adds CSS to the DOM by injecting a `<style>` tag
          //       loader: 'style-loader'
          //     },
          //     {
          //       loader: MiniCssExtractPlugin.loader,
          //       options: {
          //         // you can specify a publicPath here
          //         // by default it use publicPath in webpackOptions.output
          //         publicPath: '../'
          //       }
          //     },
          //     {
          //       // Interprets `@import` and `url()` like `import/require()` and will resolve them
          //       loader: 'css-loader'
          //     },
          //     {
          //       // Loader for webpack to process CSS with PostCSS
          //       loader: 'postcss-loader',
          //       options: {
          //         plugins: function () {
          //           return [
          //             require('autoprefixer')
          //           ];
          //         }
          //       }
          //     },
          //     {
          //       // Loads a SASS/SCSS file and compiles it to CSS
          //       loader: 'sass-loader'
          //     }
          //   ]
          // },
            {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
              },
              // {
              //   test: /\.(sa|sc|c)ss$/,
              //   use: [
              //     'style-loader' ,
              //     MiniCssExtractPlugin.loader,
              //     { loader: 'css-loader', options: { importLoaders: 1 } },
              //     {
              //       // Loader for webpack to process CSS with PostCSS
              //       loader: 'postcss-loader',
              //       options: {
              //         plugins: function () {
              //           return [
              //             require('autoprefixer')
              //           ];
              //         }
              //       }
              //     },
              //     'sass-loader',
              //   ],
              // },
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
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(sa|sc|c)ss$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
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
          new WorkboxPlugin.GenerateSW({
                   // these options encourage the ServiceWorkers to get in there fast 
                   // and not allow any straggling "old" SWs to hang around
                   clientsClaim: true,
                   skipWaiting: true
            }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};