const trace = console.log.bind(console);

module.exports = {
	isSlowRefresh: false,
    web: {
        port: 3333,
        routes: {
			'/js/extensions.js': $$$.paths.libs + '/extensions.js',
			'^': [
				(req, res, next) => $$$.web.serveFromMemory(req, res, next),
				$$$.paths.public, //STATIC
			],

			'/test': {
				'/'(req, res, next) {
					res.send('test');
				}
			},
		}
    },

	io: { serveClient: false },
}