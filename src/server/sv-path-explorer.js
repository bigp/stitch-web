

module.exports = function pathExplorer( fullpath ) {
    const privatePatterns = /^\$|^\.|.*.(sys|lnk)/i;
    const privatePaths = [
        ':/BIOS',
        ':/DRIVERS',
        ':/Documents and Settings',
        ':/Intel',
        ':/Program Files',
        ':/ProgramData',
        ':/System Volume Information',
        ':/Recovery',
        ':/Windows',
    ].map( f => f.toUpperCase() );

    return $$$.fs.readdir( fullpath )
        .then( list => {
            list = list
                .filter( f => !privatePatterns.test( f ) )
                .map( f => fullpath.mustEndWith( '/' ) + f )
                .filter( f => !f.has.apply( f.toUpperCase(), privatePaths ) );
            
            return list;
        } );
}