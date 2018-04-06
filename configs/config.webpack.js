const webpack = require('webpack');

module.exports = {
	entry: {
		bundle: [$$$.paths.public + '/js/entry.js']
	},

	output: {
		path: $$$.paths.dist,
		filename: "[name].js"
	},

	module: {
		rules: [
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
		]
	}
}