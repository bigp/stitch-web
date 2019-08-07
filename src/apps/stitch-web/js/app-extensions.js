$$$.prompt = function () {
    return $$$.app.popupMan.prompt.apply( $$$.app.popupMan, arguments );
}

_.extend( $$$.prompt, {
    defaultSkip( answer ) {
        if ( !answer ) throw 'skip';

        return answer;
    },

    defaultErr( err ) {
        if ( err === 'skip' ) return;
        trace.FAIL( _.isString( err ) ? err : err.statusText );
        //if ( !_.isString( err ) ) trace( err );
    }
} );