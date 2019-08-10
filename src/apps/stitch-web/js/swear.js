const nextTick = requestAnimationFrame;

//Globalize this, because reasons! :)
window.Swear = Swear;

function Swear( prom ) {
    if ( !new.target ) return new Swear( prom );

    this._thens = [];
    this._catches = [];
    this._dones = [];
    this._breaks = [];
    this._isDirtyFlag = false;
    this._context = null;

    if ( prom ) {
        if ( Promise.resolve( prom ) === prom ) {
            //continue;
        } else if ( _.isFunction( prom ) && prom.length == 2 ) {
            prom = new Promise(prom);
        } else if ( !_.isFunction( prom ) && _.isObject( prom ) ) {
            const ctx = this._context = prom;

            const handler = ( _then, _catch ) => {
                ctx.resolve = _then;
                ctx.reject = _catch;
            };

            prom = new Promise( handler );            
        } else {
            throw new Error( "Swear's constructor only accepts a function, object or promise" );
        }

        this.then( () => prom );
    }
}

const SWEAR_CONSTANTS = {
    BREAK: { $break: true, value: null },
    CONTINUE: { $continue: true, value: null },
    ERR_MISSING_CONTEXT: 'Missing context, did you provide one in the constructor?'
};

_.extend( Swear, {
    break( value ) {
        SWEAR_CONSTANTS.BREAK.value = value;
        throw SWEAR_CONSTANTS.BREAK;
    },
    continue( value ) {
        SWEAR_CONSTANTS.CONTINUE.value = value;
        throw SWEAR_CONSTANTS.CONTINUE;
    },
} );

_.extend( Swear.prototype, {
    resolve(value) {
        if ( !this._context ) throw SWEAR_CONSTANTS.ERR_MISSING_CONTEXT;

        this._context.resolve( value);
    },

    reject( err ) {
        if ( !this._context ) throw SWEAR_CONSTANTS.ERR_MISSING_CONTEXT;

        this._context.reject( err );
    },
    
    then( cb ) { return this._add( this._thens, cb ); },
    catch( cb ) { return this._add( this._catches, cb ); },
    done( cb ) { return this._add( this._dones, cb ); },
    break( cb ) { return this._add( this._breaks, cb ); },
    
    _add( whichArr, func ) {
        whichArr.push( func );
        this._startProcess();

        return this;
    },

    _startProcess() {
        if ( this._isDirtyFlag ) return;

        this._isDirtyFlag = true;

        nextTick( () => this.exec() );
    },

    exec() {
        // Skip if it's already processed
        if ( !this._isDirtyFlag ) return;

        this._isDirtyFlag = false;
        
        const thens = this._thens;
        const catches = this._catches;
        const breaks = this._breaks;

        let t = 0, c = 0;

        const nextThens = prevValue => {
            if ( t >= thens.length ) return this._finished();
            
            const then = thens[t++];
            
            try {
                Promise.resolve( prevValue )
                    .then( then )
                    .then( nextThens )
                    .catch( nextCatches );
            } catch ( err ) {
                nextCatches( err );
            }
        }

        const nextCatches = err => {
            switch ( err ) {
                case SWEAR_CONSTANTS.BREAK:
                    breaks.forEach( cb => cb( err.value ) );
                    break;
                case SWEAR_CONSTANTS.CONTINUE:
                    return nextThens( err.value );
                    break;
                default:
                    catches.forEach( cb => cb( err ) );
                    break;
            }

            this._finished(err);
        }

        nextThens();
    },

    _finished( err ) {
        this._dones.forEach( d => d( err ) );

        this._thens = null;
        this._catches = null;
        this._breaks = null;
        this._dones = null;
        this._context = null;
    }
} );



export default Swear;