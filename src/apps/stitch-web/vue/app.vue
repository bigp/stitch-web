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

        <popups-manager ref="popupManager"></popups-manager>
    </div>
</template>

<script>
    $$$.EVENTS = require( '~constants' ).EVENTS;

    import * as ui from './ui/*';
    import * as views from './views/*';
    import * as popups from './popups/*';
    import menuData from '../js/menu-data';
    import Swear from '../js/swear';
    import scratch from './scratch';
    
	export default {
        components: _.extend( {}, ui, views, popups ),

		data() {
			return {
                menus: menuData.menulist,
                prevRoute: '',
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
            ... Vuex.mapGetters('*'),

            currentViewName() {
                return _.trim(this.$route.path, '/');
            },

            currentViewColors() {
                const menus = this.menus;
                const menu = menus.find(f => f.name.toLowerCase() == this.currentViewName);
                const menuPrev = this.prevRoute && menus.find(f => f.name.toLowerCase() == this.prevRoute);

                return menuData.toCSSVars(menu, menuPrev);
            },

            popupMan() {
                return this.$refs.popupManager;
            }
        },

        methods: {
            ...Vuex.mapActions('*'),

            clearConsole() {
                $$$.api('/clear-cli');
                traceClear();
                trace();
                TweenMax.from('.top-bar .my-title', 0.5, {y: 10, ease:Elastic.easeOut});
            },

            ////////////////////////////////////////////////
            main() {
                //Make sure the background gradient "curtains" is hidden:
                TweenMax.set('.curtain', {alpha:0});

                //First thing when the app launches, get the project listing:
                this.fetchProjects()
                    .then( data =>  trace.OK('app.vue@main() fetch done.', data))
                    .then( () => scratch() )
                    .catch( err => trace.FAIL('app.vue@main() fetch failed!', err));
                
                // DEBUG: Make the header-click clear the browser & the CLI's console.
                $('.top-bar .my-title').click(() => this.clearConsole());
            },
		},
    }

    $(window).addEvents({
        'resize': () => $$$.app.popupMan.centerPopups(),
        '@escape': () => $$$.app.popupMan.dismissPopup(),
        '@`': () => $$$.app.clearConsole(),
    });
    
    if(preloader) {
        setTimeout(() => {
            $('.preloader-container').remove();
            preloader.kill();
        }, 500); 
    }
</script>