//import { constant } from 'change-case';

const state = {
    isFirstLoad: true,
    isLoading: false,
    projectData: {},
    treeData: {},
    ads: [],
    currentSelection: {},
}

const store = {
    state,

    mutations: {
        ... _.remap( state, key => ( {
            key: key,
            value: ( state, val ) => state[key] = val
        } ) ),
        
        currentSelection: ( s, val ) => {
            //trace( "[MUTATION] Current Selection", val, new Error());
            Cookies.set( 'currentSelection', val );

            s.currentSelection = val;
        }
    },

    //////////////////////////////////////////

    getters: {
        ..._.remap( state, key => ( {
            key: key,
            value: s => s[key]
        } ) ),

        driveLetters: s => s.projectData.driveLetters || [],
        json: s => s.projectData.json,
        favoritePaths: s => _.get( s.projectData, 'json.favoritePaths' ),
        catalog: s => _.get( s.projectData, 'json.catalog'),
    },

    actions: {
        fetchProjects( { commit, dispatch } ) {
            commit( 'isLoading', true );

            var dataResult;

            trace.INFO( "store.js - Fetch project list..." );

            return $$$.api( 'api/projects/list' )
                .then( data => {
                    commit( 'projectData', dataResult = data );
                    dispatch( 'cookieCurrentSelection' );
                    
                    trace.OK( "store.js - Fetched list OK." );
                    trace( data );

                    //TODO: Restructure the data as GROUPS -> Campaigns, etc.
                    // ???????????? Is that necessary ????????????

                    /////trace( data.json.catalog );

                //     return $$$.wait( 1000 );
                // } )
                // .then( () => {
                    commit( 'isFirstLoad', false );
                    commit( 'isLoading', false );

                    return dataResult;
                } );
        },

        sendBrowsePath( { commit, dispatch }, obj ) {
            const stack = new Error();

            return $$$.api( 'api/projects/browse-path', obj )
                .then( data => dispatch( 'onBrowsePathReceived', data ) )
                .catch( err => trace.FAIL( "browse-path failed", stack ) );
        },

        onBrowsePathReceived( { commit, dispatch }, data ) {
            trace( data );

            data.fullpath = data.fullpath.mustEndWith( '/' );

            //this.treeData = ;
            commit( 'treeData', {
                name: data.fullpath, //this.shortPath(),
                data: data.fullpath,
                isOpen: true,
                isChecked: false,
                children: data.list.map( p => ( {
                    name: p.replace( data.fullpath, '' ),
                    data: p,
                    isChecked: false,
                    isError: false,
                } ) )
            } );


            trace( 'store@onBrowsePathReceived() ...' );

            return 'okidoki';
        },

        addFavorite( { commit }, path ) {
            return $$$.api( 'api/projects/add-favorite-path', { path } )
                .then( data => commit( 'projectData', data.json ) );
        },

        removeFavorite( { commit }, path ) {
            return $$$.api( 'api/projects/remove-favorite-path', { path } )
                .then( data => commit( 'projectData', data.json ) );
        },

        fetchAdsByProject( { commit, dispatch }, project ) {
            if ( !project ) return null;

            return $$$.api( 'api/projects/list-ads', { projectDir: project.path } )
                .then( data => {
                    commit( 'ads', data.ads );
                    // dispatch( 'cookieCurrentSelection' );
                    
                    // if ( current.ad ) {
                    //     _this.onAdSelected( current.ad );
                    // }
                } )
                .catch( err => trace( err ) );
        },

        cookieCurrentSelection( { commit, dispatch }, cookie ) {
            cookie = cookie || getCookie( 'currentSelection' );
            
            //trace( "store@cookieCurrentSelection() ...", new Error() );
            commit( 'currentSelection', cookie );
        }
    }
};

function getCookie( key, def ) {
    const result = Cookies.getJSON( key );
    if ( !result || result == 'undefined' || result == 'null') return def || {};
    return result;
}

// function onError( err, item ) {
//     if ( err && err.responseText ) {
//         trace( err.responseText );
//     }

//     item.isError = true;

//     this.$forceUpdate();
// }

//////////////////////////////////////////

$$$.store = new Vuex.Store( store );

export default $$$.store;