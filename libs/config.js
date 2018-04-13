const webpack = require('webpack');
const path = require('path');
const entry = $$$.paths.public + '/js/entry.js';

module.exports = {
	isSlowRefresh: false,
    web: {
        port: 3333,
        routes: {
			'/js/extensions.js': $$$.paths.libs + '/extensions.js',
			'^': [
				'*MEMORY*',
				$$$.paths.public,
			],

			'/test': {
				'/': "test"
			},
		}
    },

	io: { serveClient: false },

	webpack: {
		entry: {
			'bundle': entry,
		},

		output: {
			path: path.resolve($$$.paths.dist),
			filename: "[name].js"
		},

		module: {
			rules: [
				{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
				{ test: /\.vue$/, use: [ 'vue-loader' ] },
				{ test: /\.js$/, use: {
					loader: 'babel-loader',
					options: {
						babelrc: true,
						presets: ['@babel/preset-env'],
					}
				}},
			]
		},

		optimization: {
			minimize: $$$.env==='prod',
		}
	}
}