const Events = require('events');
global.$$$ = new Events();
global._ = require('lodash');
require('./libs/extensions');

const yargs = require('yargs');
const commands = yargs
	.alias('p','prod')
	.alias('v','verbose')
	.argv;

require('./libs/sv-restarter')(null, () => {
	$$$.env = commands.p ? 'prod' : 'dev';
	$$$.paths = require('./libs/sv-paths');

	const config = require($$$.paths.libs + '/config');
	const wpConfig = config.webpack;

	const MFS = require('memory-fs');

	$$$.memFS = new MFS();
	$$$.web = require('./libs/sv-web')(config);
	$$$.watcher = require('./libs/sv-watcher')(config);
	$$$.autoOpen = require('./libs/sv-auto-open')(config);
	$$$.sass = require('./libs/sv-sass-compile')();
	$$$.webpack = require('./libs/sv-webpack')(wpConfig);

	$$$.webpack.run()
		.then(stats => { /* trace('WEBPACK COMPLETED'); */})
		.catch(err => traceError(err));

	if(process.argv.has('--testing')) {
		require('./sv-test-helpers')(GLOBALS);
	}
});