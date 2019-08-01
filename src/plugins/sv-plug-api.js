module.exports = class PluginAPI {
    init() {
        this.routes = {
            '/api/*'( req, res, next ) {
                trace( "API CALLED: " + req.fullUrl() );
                next();
            },
            '/api/'( req, res, next ) {
                res.send( "PRIVATE REST API!" );
            },

            '/clear-cli'( req, res, next ) {
                setTimeout( traceClear, 100 );
                res.send( { ok: 'cleared CLI.' } );
            }

        };
    }

    configure() {
        
    }
}
