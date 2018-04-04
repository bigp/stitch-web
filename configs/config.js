const trace = console.log.bind(console);

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
}