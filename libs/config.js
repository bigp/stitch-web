const webpack = require('webpack');
const path = require('path');
const entry = $$$.paths.public + '/js/entry.js';

const cookieSecret = 'stitch';

module.exports = {
	isSlowRefresh: false,
	autoOpen: true,
    web: {
        port: 9999,
        routes: {
			'/js/extensions.js': $$$.paths.libs + '/extensions.js',
			'^': [
				'*MEMORY*',
				$$$.paths.public,
			],

			'/test': {
				'/': "test"
			},
		},
    },

	spritesmith: {
		quality: 80,
		padding: 2,
		//output: $$$.paths.public + "/dist/atlas.png",
	},

	cookieSession: {
		name: 'session',
		keys: [cookieSecret]
	},

	session: {
		secret: cookieSecret,
		resave: true,
		saveUninitialized: false,
		//cookie:{secure:false}
	},

	redisStore: {
		host: 'localhost',
		port: 6379,
		ttl :  260
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