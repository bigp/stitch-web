const pathExplorer = require( '../server/sv-path-explorer' );
const wdl = require( 'windows-drive-letters' );
wdl.used().then( letters => driveLetters = letters );

const defaultData = {
    document: 'stitch-web projects',
    favoritePaths: []
};

const regexProjectName = /([0-9]+_[^\/]*)/gi;

const PROJECT_STATUS = {
    _01_IMPORTED: 1,
    _02_WORKING: 2,
    _03_PENDING: 3,
    _04_FINAL: 4,
    _05_INVOICE_NEEDED: 5,
    _06_INVOICE_SENT: 6,
    _07_INVOICE_RECEIVED: 7,
    _08_INVOICE_DONE: 8
}

let driveLetters;

module.exports = class PluginProjects {
    init() {
        const _this = this;

        function sendJSONData( res, extra ) {
            const data = _.merge( extra, { json: _this.jsonHandler.data, driveLetters: driveLetters } );
            
            res.send( data );
        }

        _this.projectsURI = $$$.paths( $$$.paths.data, 'sw-projects.json' );

        _this.routes = {
            '/api/projects': {
                '/list'( req, res, next ) {
                    const data = _this.jsonHandler.data;
                    if ( !data.clients ) data.clients = [];

                    _this.jsonHandler.save()
                        .then( () => sendJSONData( res, { ok: 'list ok.' } ) );
                },
                
                '/open-project'( req, res, next ) {
                    trace( "Hello! Open-Project..." );

                    res.send( { hello: 'world' } );
                },

                'post::/browse-path'( req, res, next ) {
                    let fullpath = req.body.path || '';

                    if ( fullpath.has( 'undefined' ) ) {
                        fullpath = fullpath.replace( /undefined/g, '' )
                        
                        trace( 'fullpath: ' + fullpath );
                        

                        return $$$.resError( res, 'Found undefined' );
                    }
                    
                    pathExplorer(fullpath)
                        .then( list => {

                            res.send( {
                                list: list,
                                letter: req.body.letter,
                                fullpath: fullpath
                            } );
                        } )
                        .catch( err => $$$.resError( res, 'Error getting directory at path: ' + fullpath + '\n' + err ) );
                },

                'post::/add-favorite-path'( req, res, next ) {
                    const path = req.body.path;
                    const favs = _this.jsonHandler.data.favoritePaths;

                    if ( favs.has( path ) ) {
                        return $$$.resError( res, "Path already exists: " + path );
                    }

                    favs.push( path );

                    _this.jsonHandler.save()
                        .then( () => sendJSONData( res, { ok: 'JSON saved ok.' } ) )
                        .catch( err => {
                            $$$.resError( res, "JSON failed to save: " + err );
                        } );
                },

                'post::/remove-favorite-path'( req, res, next ) {
                    const path = req.body.path;
                    const favs = _this.jsonHandler.data.favoritePaths;

                    if ( !favs.has( path ) ) {
                        return $$$.resError( res, "Path does not exists in favorites: " + path );
                    }

                    favs.remove( path );

                    _this.jsonHandler.save()
                        .then( () => sendJSONData( res, { ok: 'JSON saved ok.' } ) )
                        .catch( err => {
                            $$$.resError( res, "JSON failed to save: " + err );
                        } );
                },

                ///////////////////////////////////////////////////

                'post::/import-projects'( req, res, next ) {
                    const dirs = req.body.dirs;
                    if ( !dirs || !dirs.length ) {
                        return $$$.resError( res, 'No directories supplied.' );
                    }

                    const jsonData = _this.jsonHandler.data;
                    const catalog = _.getOrCreate( jsonData, 'catalog', {} );
                    
                    //projects;
                    Promise.all( dirs.map( f => _this.importProject( f, catalog ) ) )
                        //.then( () => _this.jsonHandler.save())
                        .then( () => {
                            traceJSON( catalog );
                            sendJSONData( res, { ok: 'import ok', catalog: catalog } );
                        } )
                        .catch( err => $$$.resError( res, err ) );
                },

                'post::/list-ads'( req, res, next ) {
                    const projectDir = req.body.projectDir.mustEndWith( '/' );
                    const projectAds = projectDir + 'ads';
                    const projectPublic = projectDir + 'public';

                    pathExplorer( projectAds )
                        .then( ads => {
                            ads = ads.map( ad => ( {
                                name: ad.after( '/', null, true ),
                                src: ad,
                                html: ad.replace( projectAds, projectPublic) + '.html'
                            } ) );

                            res.send( { ads: ads } );
                        } )
                        .catch( err => $$$.resError( res, err ) );
                },

                'get::/load-ad'( req, res, next ) {
                    const adHTML = req.query.html.mustEndWith( '.html' );

                    if ( !$$$.fs.existsSync( adHTML ) ) return $$$.resError( res, 'HTML file does not exists: ' + adHTML );

                    res.sendFile( adHTML );
                },

                'get::/open-logo-folder'( req, res, next ) {
                    const logosPath = $$$.paths.private + '/data/images';

                    $$$.opn( logosPath );

                    res.send( {ok: 'Opened logos folder.', path: logosPath} );
                },

                'post::/add-project'( req, res, next ) {
                    const campaign = req.body.campaign;
                    const projectName = req.body.projectName;

                    if ( !regexProjectName.test( projectName ) ) {
                      return $$$.resError(res, 'Must use project name convention (3-digits, _, etc.)')  
                    }

                    //$$$.fs.mkdirp();
                    res.send( { ok: 'project added: ' + req.body.projectName } );
                },
            },

            '*'( req, res, next ) {
                $$$.resError(res, "API ERROR" );
            },
        };
    }

    importProject( dir, catalog ) {
        const clean = s => _.trim( s, '_/' );
        const toMatchingProject = f => ( { path: f, match: f.match( regexProjectName ) } );
        const toCatalogEntry = p => {
            const pathSplit = p.path.split( '/' );
            const projectName = clean(pathSplit.pop());
            const campaignName = clean(pathSplit.pop());
            const clientName = clean(pathSplit.pop());

            const client = _.getOrCreate( catalog, clientName, {
                campaigns: {},
                path: pathSplit.concat([clientName]).join('/'),
            } );

            const campaign = _.getOrCreate( client.campaigns, campaignName, {
                path: pathSplit.concat([clientName, campaignName]).join('/'),
                projects: []
            } );

            //const projects = 
            // Populate the campaign's list of projects:
            campaign.projects.push( {
                name: projectName,
                path: p.path,
                status: PROJECT_STATUS._01_IMPORTED,
            } );
        };

        return pathExplorer( dir )
            .then( list => list.map( toMatchingProject ).filter( f => f.match ) )
            .then( filtered => filtered.forEach( toCatalogEntry ) );
    }

    configure() {
        this.jsonHandler = $$$.JsonHandler( this.projectsURI, defaultData );
        //this.jsonHandler.then( () => trace(  ) )

        //////////////////////////


    }
}
