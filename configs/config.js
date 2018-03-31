const fs = require('fs-extra');
const webpack = require('webpack');
const mime = require('mime-types');
const trace = console.log.bind(console);

module.exports = {
	isSlowRefresh: false,
    web: {
        port: 3333,
        routes: {
			'/js/extensions.js': $$$.paths.libs + '/extensions.js',
			'^': [
				(req, res, next) => {
					const localURI = $$$.paths.public + req.url.split('?')[0];
					if(!req.url.has('.') || !$$$.memFS.existsSync(localURI)) {
						//trace("MEM-NEXT".bgYellow, req.url);
						return next();
					}

					//trace("MEM OK".bgGreen, req.url);
					res.contentType(mime.lookup(localURI));
					return res.send($$$.memFS.readFileSync(localURI));
				},
				$$$.paths.public, //STATIC
			],

			'/test': {
				'/'(req, res, next) {
					res.send('test');
				}
			},
		},
		onError(err, req, res, next) {
			trace(err);
			res.status(404).send();
		}
    },

	io: { serveClient: false },
}