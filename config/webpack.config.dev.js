var base = require('./webpack.config.base');
var path = require('path');

module.exports = Object.assign(base, {
	entry: {
	app: path.join(__dirname, '..', '/test/manual/entry.jsx')
},
devServer: {
	contentBase: path.join(__dirname, '..', 'public'),
	compress: true,
	port: 9999
},
output: {
	path: path.resolve(__dirname, '..', 'public', 'dev'),
	filename: 'bundle.js',
	publicPath: '/dev',
	libraryTarget: 'umd'
},
});
