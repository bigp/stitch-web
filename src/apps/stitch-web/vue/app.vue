<template>
    <div :style="currentViewColors">
        <div class="curtain grid noclick fullsize top-left abs"></div>
        
        <div class="main-grid">
            <!------------ TOP-BAR ---------------->
            <top-bar icon="star-of-life" title="Stitch-Web" :menus="menus"></top-bar>

            <!------------ MAIN PANEL ---------------->
            <div class="main">
                <component ref="$currentView" :is="currentViewName"></component>
            </div>

            <!------------ FOOTER ---------------->
            <div class="footer text-shadow">
                <center><icon name="sync-alt" class="inline-block" :class="{rotating: isLoading}"></icon> &copy; PierreChamberlain.ca Stitch-Web 2019</center>
            </div>
        </div>

        <!------------ FULLSIZE CONTAINER (for popups, modals, etc.) ---------------->
        <div class="fullsize abs top-left" v-if="hasPopups">
            <div class="popups modal-shadow top-left fullsize"></div>
            <component v-for="(popup, i) in popups" :key="i" :is="popup.name" class="popup">
            </component>
        </div>
    </div>
</template>

<script>
    import * as ui from './ui/*';
    import * as views from './views/*';
    import * as popups from './popups/*';
    import store, {menus} from './store.js';

	export default {
        components: _.extend( {}, ui, views, popups ),
        
        store,

		data() {
			return {
                menus: menus,
                prevRoute: '',
                popups: [],
			}
        },

        watch: {
			'$route'(current, prev) {
                current = _.trim(current.path, '/');
                prev = _.trim(prev.path, '/');

                this.prevRoute = prev;

                const tl = new TimelineMax();
                tl.fromTo('.curtain', 0.4, {alpha:1}, {alpha:0}, 0);
                tl.fromTo('.main', 0.4, {alpha:0}, {alpha:1}, 0);
                tl.fromTo('.right-buttons', 0.3, {alpha:0, y:-10}, {alpha:1, y:0}, 0);
                tl.fromTo('.fa-star-of-life', 0.4, {rotation:-180}, {rotation:0, ease:Sine.easeOut}, 0);
            }
        },

        computed: {
            ... Vuex.mapState('isLoading cookieCurrentSelection'),

            currentViewName() {
                return _.trim(this.$route.path, '/');
            },

            currentViewColors() {
                const menu = menus.find(f => f.name.toLowerCase() == this.currentViewName);

                if(!menu) return {};

                const menuPrev = this.prevRoute && menus.find(f => f.name.toLowerCase() == this.prevRoute);

                const clr = tinycolor(menu.color);
                const clrPrev = menuPrev ? tinycolor(menuPrev.color) : clr;

                // Return an object containing '--clr-main', etc.
                // (CSS variables are prefixed with double hyphens "--")
                return $$$.css.vars({
                    'clr-main': clr.toString(),
                    'clr-main-dark': clr.darken(10).toString(),
                    'clr-main-lite': clr.lighten(30).toString(),
                    'clr-prev': clrPrev.toString(),
                    'clr-prev-dark': clrPrev.darken(10).toString(),
                    'clr-prev-lite': clrPrev.lighten(30).toString(),
                });
            },

            hasPopups() {
                return this.popups.length > 0;
            }
        },

        methods: {
            ...Vuex.mapActions('fetchProjects'),

            main() {
                //Make sure the background gradient "curtains" is hidden:
                TweenMax.set('.curtain', {alpha:0});

                const _this = this;
                
                //First thing when the app launches, get the project listing:
                this.fetchProjects()
                    .then( res => trace('app.vue@main()', res));

                // DEBUG: Make the header-click clear the browser & the CLI's console.
                $('.top-bar .my-title').click(() => {
                    $$$.api('/clear-cli');
                    traceClear();
                })
            },

                // _this.fetchProjects()
                //     .then( () => {
                //         //If we have a breadcrumb trail of the last current selection, use it!
                //         const current = Cookies.getJSON('currentSelection');
                        
                //         // Nothing found? 
                //         if(!current || !current.client) return;
                            
                //         //Update current selection (from the Cookies):
                //         _this.current = current;

                //         $$$.emit('@projects-list-cookie', current);
                //     });

            // fetchProjects() {
            //     return $$$.api('api/projects/list')
            //         .then( data => {
            //             this.projectData = data;
            //             trace('app.vue');
            //             $$$.emit('@projects-list-loaded', data);
            //         } );
            // },

            addPopup(popup, cb) {
                if(cb) popup.cb = cb;

                this.popups.push( popup );

                requestAnimationFrame(() => {
                    this.centerPopups();
                    TweenMax.from('.popup, .modal-shadow', 0.3, {alpha:0});
                });
            },

            dismissPopup(answer) {
                var popup = this.popups.pop();
                if(!popup) return;

                popup.cb && popup.cb( answer );
            },

            centerPopups() {
                $('.popup').center();
            }
		},
    }

    $(window).addEvents({
        'resize': () => $$$.app.centerPopups(),
        '@escape': () => $$$.app.dismissPopup(),
    });
    
</script>