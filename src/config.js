/**
 * Created by Chamberlain on 7/21/2018.
 */

const cookieSecret = 'stitch-web';

module.exports = {
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
};