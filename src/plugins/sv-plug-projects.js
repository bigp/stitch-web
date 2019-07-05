
const defaultData = { document: 'stitch-web projects', projects: [] };

module.exports = class PluginProjects {
    init() {
        const _this = this;

        this.projectsURI = $$$.paths( $$$.paths.data, 'sw-projects.json' );

        this.routes = {
            'post::/projects'( req, res, next ) {
                trace( "Loading up some project JSON data!" );
                res.json( _this.jsonHandler.data );
            }
        };
    }

    configure() {
        $$$.JsonHandler( this.projectsURI, defaultData )
            .then( json => this.jsonHandler = json )
            .then( () => trace( this.jsonHandler.json() ) );

        //////////////////////////


    }
}