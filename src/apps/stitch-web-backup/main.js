import * as ui from './vue/ui/*';
import * as views from './vue/views/*';

export default {
    components: _.extend( {}, ui, views ),

    main() {
        trace( "Hello world!!!" );
    }
};