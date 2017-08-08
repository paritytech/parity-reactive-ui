var base = require('./webpack.config.base');
var path = require('path');

module.exports = Object.assign(base,{
  entry: {
  	app:  path.join(__dirname, '..','/src/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    libraryTarget: 'commonjs'
  },
  externals: [
    'oo7',
    'oo7-react',
    'oo7-parity',
    'react',
    'react-dom',
    'semantic-ui-react',
    'semantic-ui-css/semantic.min.css'
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      // import local oo7-parity folder (not from node_modules)
      //'oo7-parity':path.resolve(__dirname + '/../../', 'oo7-parity'),
      //'oo7-react':path.resolve(__dirname + '/../../', 'oo7-react'),
      //'oo7':path.resolve(__dirname + '/../../', 'oo7')
    },
  }
});
