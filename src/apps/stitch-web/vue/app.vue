<template>
    <div :style="currentViewColors">
        <div class="curtain grid noclick fullsize top-left abs"></div>
        
        <div class="main-grid">
            <top-bar icon="star-of-life" title="Stitch-Web" :menus="menus">
                <portal-target name="extra-buttons"
                    class="extra-buttons grid-last-col">
                </portal-target>
            </top-bar>

            <div class="main">
                <component :is="currentViewName"></component>
            </div>

            <div class="footer text-shadow">
                <center>&copy; PierreChamberlain.ca Stitch-Web 2019</center>
            </div>
        </div>

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

    const menus = [
		{name:'Projects', icon:'flag', color: '#2a3'},
        {name:'Invoices', icon:'file', color: '#06f'},
        {name:'Animations', icon:'image', color: '#42d'},
		{name:'Settings', icon:'cog', color: '#f00'},
	];

	export default {
        components: _.extend( {}, ui, views, popups ),

		data() {
			return {
                popups: [],
                menus: menus,
                prevRoute: '',
                projectsData: {},

                current: {
                    client: null,
                    campaign: null,
                    project: null,
                    ad: null,
                }
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
                tl.fromTo('.extra-buttons', 0.3, {alpha:0, y:-10}, {alpha:1, y:0}, 0);
                tl.fromTo('.fa-star-of-life', 0.4, {rotation:-180}, {rotation:0, ease:Sine.easeOut}, 0);
                //_.defer(() => this.$forceUpdate());
            }
        },

        computed: {
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
            main() {
                trace("App.vue: methods.main() !!!");
                TweenMax.set('.curtain', {alpha:0});
            },

            currentColor(brightness) {
                const menu = menus.filter(f => f.name);
                trace(menu);
            },

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