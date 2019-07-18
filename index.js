
let driveLetters;
const wdl = require( 'windows-drive-letters' );
wdl.used().then( letters => driveLetters = letters );

$$$.web.addRoutes( {
	'/api': {
		'use::/*'( req, res, next ) {
			trace( "API USED!" );
			trace( req.fullUrl() );
			next();
		},

		'/'( req, res, next ) {
			res.send( "PRIVATE REST API!" );
		},

		'/projects': {
			'/open-project'( req, res, next ) {
				trace( "Hello! Open-Project..." );

				res.send( { hello: 'world' } );
			},

			'/drive-letters'( req, res, next ) {
				res.send( { driveLetters: driveLetters } );
			},
		},

		'*'( req, res, next ) {
			res.status( 404 ).send( "API ERROR" );
		},
	},
} );
