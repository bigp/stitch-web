import * as ui from './vue/ui/*';
import * as views from './vue/views/*';

export default {
    //Use ES6 Object Spread operator.
    components: { ... ui, ... views },

    main() {
        trace( "Hello world!!!" );

        $$$.send( '/projects' )
            .then( data => {
                trace( "Loaded JSON: " );
                trace( data );
            } )
            .catch( err => {
                trace( err );
            } );
    }
};