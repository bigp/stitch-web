import { constant } from 'change-case';

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
        //...
        ... _.remap( state, key => ( {
            key: constant( key ),
            value: ( state, val ) => state[key] = val
        } ) ),
        CURRENT_SELECTION: ( s, val ) => {
            trace( "[MUTATION] Current Selection", val, new Error());
            Cookies.set( 'currentSelection', val );

            s.currentSelection = val;
        }
    },

    //////////////////////////////////////////

    getters: {
        ..._.remap( state, key => ( {
            key: key,
            value: s => s[key]
        })),
        driveLetters: s => s.projectData.driveLetters,
        json: s => s.projectData.json,
        catalog: s => _.get( s, 'projectData.json.catalog'),
    },

    actions: {
        fetchProjects( { commit, dispatch } ) {
            commit( 'IS_LOADING', true );

            var dataResult;

            return $$$.api( 'api/projects/list' )
                .then( data => {
                    commit( 'PROJECT_DATA', dataResult = data );
                    dispatch( 'cookieCurrentSelection' );

                    return $$$.wait( 1000 );
                } )
                .then( () => {
                    commit( 'IS_FIRST_LOAD', false );
                    commit( 'IS_LOADING', false );

                    return dataResult;
                } );
        },

        sendBrowsePath( { commit, dispatch }, obj ) {
            trace( obj );
            return $$$.api( 'api/projects/browse-path', obj )
                .then( data => dispatch( 'onBrowsePathReceived', data ) );
        },

        onBrowsePathReceived( { commit, dispatch }, data ) {
            data.fullpath = data.fullpath.mustEndWith( '/' );

            //this.treeData = ;
            commit( 'TREE_DATA', {
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
                .then( data => commit( 'PROJECT_DATA', data.json ) );
        },

        removeFavorite( { commit }, path ) {
            return $$$.api( 'api/projects/remove-favorite-path', { path } )
                .then( data => commit( 'PROJECT_DATA', data.json ) );
        },

        fetchAdsByProject( { commit, dispatch }, project ) {
            if ( !project ) return null;

            return $$$.api( 'api/projects/list-ads', { projectDir: project.path } )
                .then( data => {
                    commit( 'ADS', data.ads );
                    // dispatch( 'cookieCurrentSelection' );
                    
                    // if ( current.ad ) {
                    //     _this.onAdSelected( current.ad );
                    // }
                } )
                .catch( err => trace( err ) );
        },

        cookieCurrentSelection( { commit, dispatch }, cookie ) {
            cookie = cookie || getCookie( 'currentSelection' );
            
            trace( "store@cookieCurrentSelection() ... COOKIE", new Error() );
            commit( 'CURRENT_SELECTION', cookie );
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

export default new Vuex.Store( store );