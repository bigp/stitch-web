
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

		'/open-project'( req, res, next ) {
			trace( "Hello! Open-Project..." );

			res.send( { hello: 'world' } );
		},

		'*'( req, res, next ) {
			res.send( "API" );
		},
	},
})