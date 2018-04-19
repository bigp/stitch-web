/**
 * Created by Chamberlain on 4/18/2018.
 */
const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20').Strategy;
let conf;
function SELF(config) {
	conf = config;
	//passport.use(new TwitterStrategy(twitterCreds, SELF.onTwitterAuthenticated));
	const auth = _.mapValues(config.google.auth, value => value.replace('[PORT]', config.web.port));

	const googleStrat = new GoogleStrat(auth, SELF.onGoogleReady);

	passport.use(googleStrat);
	trace("PASSPORT ADDED...".cyan);

	return SELF;
}

SELF.onGoogleReady = function(access, refresh, profile, cb) {
	traceProps(profile);

	cb(null, {
		profile: profile,
		access: access,
		refresh: refresh
	});
};

SELF.routes = function() {
	return {
		'/google': {
			'/': passport.authenticate('google', {scope: conf.google.scope}),
			'use::/callback'() {
				return [
					passport.authenticate('google', {failureRedirect: '/login'}),
					(err, req, res, next) => {
						trace("YOU ARE HERE...".yellow);
						trace(req.params);
						trace(req.query);
						trace(req.session);
						trace(req.user);

						//trace(req.session.token = req.user.token);
						res.status(200).send('GOOGLE OK'); //redirect('/');
					}
				];
			}
		},
		// '/twitter': {
		// 	'/': passport.authenticate('twitter'),
		// 	'/callback'(req, res, next) {
		// 		trace(req.params);
		// 		trace(req.body);
		// 		res.status(200).send('TWITTER OK');
		// 	}
		// },
	}
}

module.exports = SELF;



// SELF.onTwitterAuthenticated = function(token, secret, profile, cb) {
// 	trace([
// 		'token:', token,
// 		'secret:', secret,
// 		'profile:', profile,
// 		'cb:', cb,
// 	]);
// 	cb(err, profile);
// };