var path = require('path');

module.exports = {
  entry: {
  	app: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    libraryTarget: 'commonjs'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: { presets: ['es2015', 'react'] } },
      { test: /\.css$/, use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /jquery/, loader: 'expose?$!expose?jQuery' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  externals: ['oo7', 'oo7-react', 'oo7-parity']
};
