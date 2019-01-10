const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

// Serve the files on port 4000.

app.get('/', (req, res) => {
    console.log("root get");
    res.json({"status":"OK"});
  });
app.listen(4000, function () {
  console.log('Example app listening on port 4000!\n');
});