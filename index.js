const Events = require('events');
global.$$$ = new Events();
global._ = require('lodash');
require('./libs/extensions');
require('./libs/extensions-node');
require('colors');

const yargs = require('yargs');
const commands = yargs
	.alias('p','prod')
	.alias('v','verbose')
	.alias('x', 'exp')
	.argv;

if(commands.x) {
	$$$.paths = require('./libs/sv-paths');
	require($$$.paths.experiments + "/_main.js");
	return;
}

require('./libs/sv-restarter')(null, () => {
	trace("Starting...");

	$$$.env = commands.p ? 'prod' : 'dev';
	$$$.paths = require('./libs/sv-paths');

	const configPriv = require($$$.paths.private + '/private.config');
	const config = _.extend( require($$$.paths.libs + '/config'), configPriv);
	const configWP = config.webpack;

	const MFS = require('memory-fs');

	$$$.memFS = new MFS();
	$$$.web = require('./libs/sv-web')(config);
	$$$.watcher = require('./libs/sv-watcher')(config);
	$$$.autoOpen = require('./libs/sv-auto-open')(config);
	$$$.sass = require('./libs/sv-sass-compile')();
	$$$.webpack = require('./libs/sv-webpack')(configWP);
	$$$.stitch = require('./libs/sv-stitchweb')(config);

	$$$.webpack.run()
		.then(stats => { /* trace('WEBPACK COMPLETED'); */})
		.catch(err => traceError(err));

	if(process.argv.has('--testing')) {
		require('./sv-chai-helpers')(GLOBALS);
	}
});