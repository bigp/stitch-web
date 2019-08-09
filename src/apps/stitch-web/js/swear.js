const nextTick = requestAnimationFrame;
window.Swear = Swear;

function Swear( prom ) {
    if ( !new.target ) return new Swear( prom );

    this._thens = [];
    this._catches = [];
    this._dones = [];
    this._breaks = [];
    this._isDirtyFlag = false;

    if ( prom ) {
        trace( "Check...." );
        if ( Promise.resolve( prom ) === prom ) {
            trace( 'isPromise .......' );
            this.then( () => prom );
        } else if ( _.isFunction( prom ) && prom.length == 2 ) {
            trace( 'isFunction .......' );
            this.then( () => new Promise(prom) );
        } else if ( _.isObject( prom ) ) {
            trace( 'isObject .......' );

            const handler = ( _then, _catch ) => {
                prom.resolve = _then;
                prom.reject = _catch;
            };

            this.then( () => new Promise(handler) );
        } else {
            throw new Error( "Swear's constructor only accepts a function, object or promise" );
        }
    }
}

const SWEAR_BREAK = { $break: true, value: null };
const SWEAR_CONTINUE = { $continue: true, value: null };

_.extend( Swear, {
    break( value ) {
        SWEAR_BREAK.value = value;
        throw SWEAR_BREAK;
    },
    continue( value ) {
        SWEAR_CONTINUE.value = value;
        throw SWEAR_CONTINUE;
    },
} );

_.extend( Swear.prototype, {
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
        nextTick( () => this._processTasks() );
    },

    _processTasks() {
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
                case SWEAR_BREAK:
                    breaks.forEach( cb => cb( err.value ) );
                    break;
                case SWEAR_CONTINUE:
                    nextThens( err.value );
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
    }
} );



export default Swear;