var path = require ('path');

module.exports = {
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/,
				loader: "babel-loader"
			},
      { test: /\.css$/, use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /jquery/, loader: 'expose?$!expose?jQuery' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
    	path.join(__dirname,'..','node_modules')
    ]
  }
};
