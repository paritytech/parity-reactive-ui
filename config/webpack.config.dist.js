var base = require('./webpack.config.base');
var path = require('path');

module.exports = Object.assign(base, {
	entry: {
		app: path.join(__dirname, '..', '/src/index.jsx')
	},
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
		libraryTarget: 'commonjs'
	},
	externals: ['oo7', 'oo7-react', 'oo7-parity']
});
