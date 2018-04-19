/**
 * Created by Chamberlain on 4/17/2018.
 */
const fs = require('fs-extra');
const dbFile = $$$.paths.private + '/db.json';
const authStrategies = require('./sv-auth-for-passport');

function SELF(config) {
	$$$.web.setupRoutes({
		'/u': { //User-Directory:
			'/*': SELF.authenticate,
			'/projects'(req, res, next) {
				trace("We are in projects");
				res.send("LIST OF PROJECTS");
			}
		},
		'/auth': authStrategies(config).routes()
	});

	return SELF;
}

SELF.authenticate = function(req, res, next) {
	if(!req.session) {
		traceOnce("redis-not-running", "Oops!".red + " You probably forgot to run: " + "npm run redis".yellow);
		return res.status(404).send("May need to restart Redis Server!");
	}

	const auth = req.session.auth || (req.session.auth = {attempts:0});

	if(auth.isLoggedIn) {
		trace("Is logged in!");
		return next();
	}

	fs.readJson(dbFile)
		.then(userDB => {
			trace("Got user db: ");
			trace(userDB);
			next();
		})
		.catch(err => {
			auth.attempts++;
			//auth.isLoggedIn
			traceError("Could not load DB data: " + auth.attempts);
			res.status(404).send("Could not load DB data!");
		});
};


module.exports = SELF;