const webpack = require('webpack');
const path = require('path');
const entry = $$$.paths.public + '/js/entry.js';

module.exports = {
	entry: {
		'bundle': entry,
		//'bundle.min': entry
	},

	output: {
		path: path.resolve($$$.paths.dist),
		filename: "[name].js"
	},

	module: {
		rules: [
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
			{ test: /\.vue$/, use: [ 'vue-loader' ] },
		]
	},

	optimization: {
		minimize: false,
	}
}