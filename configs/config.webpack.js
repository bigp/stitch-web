module.exports = {
	entry: {
		bundle: [$$$.paths.public + '/js/entry.js']
	},

	output: {
		path: $$$.paths.dist,
		filename: "[name].js"
	},

	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" }
		]
	}
}