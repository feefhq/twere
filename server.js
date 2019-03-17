/**
 * This is here as an experiment at the moment. Running webpack-dev-server via
 * the Node API might be a way to do testing via middleware, or other funky
 * development tooling.
 *
 * But for now, this just reflects what is done by calling from the CLI.
 */

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('Dev server listening on port 5000');
});
