const Events = require('events');
global.$$$ = new Events();
global._ = require('lodash');
require('./libs/extensions');

require('./libs/restarter')(null, () => {
	$$$.paths = require('./libs/sv-paths');

	const config = require($$$.paths.configs + '/config');
	const wpConfig = require($$$.paths.configs + '/config.webpack');

	const MFS = require('memory-fs');

	$$$.memFS = new MFS();
	$$$.web = require('./libs/sv-web')(config);
	$$$.watcher = require('./libs/sv-watcher')(config);
	$$$.sass = require('./libs/sv-sass-compile')();
	$$$.webpack = require('./libs/sv-webpack')(wpConfig);

	$$$.webpack.run()
		.then(stats => {
			//trace('WEBPACK COMPLETED');
		})
		.catch(err => traceError(err));

	if(process.argv.has('--testing')) {
		require('./sv-test-helpers')(GLOBALS);
	}
});