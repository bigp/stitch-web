<template>
    <div class="app fullsize">
        <top-bar></top-bar>

        <div id="master">
            <router-view :key="$route.fullPath"></router-view>
        </div>

        <div id="panels" class="fullsize">
            <!-- Panels are dynamically added here -->
            <div v-for="(panel, p) in panels"
                 :is="panel.name">
            </div>
        </div>
    </div>
</template>
<script>
    const homeMenu = {name: 'Home', path:'/', color: '#456', icon: 'home', desc: 'Welcome to Stitch-Web!'};
    export default {
		data() {
			return {
				title: 'Hello World',

				homeMenu: homeMenu,

				topmenus: [
					homeMenu,
					{name: 'Project',  color: '#f80', icon: 'star', desc: 'Create and Manage your projects and clients.'},
					{name: 'Designer', color: '#c08', icon: 'object-group', desc: 'Draw and Import assets into a project.'},
					{name: 'Animator', color: '#0c8', icon: 'play-circle', desc: 'Bring your assets to life in a timeline interface.'},
					{name: 'Invoices', color: '#08f', icon: 'file', desc: 'Bill your clients and get paid!'},
				],

				breadcrumbs: [],
				panels: []
			}
        },

        methods: {
			showModeSelector() {
				$$$.panelManager.push('mode-selector');
            },

			onMenuClick(menu) {
				if(!menu.cb) return this.showModeSelector();

				menu.cb(menu);
			},

			getMenuCSS(menu) {
				if(!menu) menu = this.breadcrumbs[0];
				if(!menu) return '';

				const bgColor = tinycolor(menu.color || '#88f');

				return $$$.css.vars({
					bgColor: bgColor.toHexString(),
					bgColorDark: bgColor.darken(20).toHexString(),
					bgColorLight: bgColor.brighten(20).toHexString(),
                    bgColorHover: bgColor.brighten(50).toHexString(),
				});
			},
            getRouteName() {
				return this.$router.currentRoute.path.split('/')[1];
            },
			getRoutePath(obj) {
				var r = this.$router.currentRoute;

				if(!obj) obj = r.params;
				else {
					_.forOwn(r.params, (value, key) => {
						if(!obj[key]) obj[key] = _.isUndefined(value) ? false : value;
					});
				}

				const link = [obj.name || r.name].pushIfExists(obj.brand, obj.campaign, obj.ad);

				return '/' + link.join('/');
			},

			gotoRoute(obj) {
				const isDifferentName = obj.name && obj.name!==this.getRouteName();
				const link = this.getRoutePath(obj);
				this.$router.push(link);

				if(isDifferentName) {
					this.$lookup('menu').init();
					$$$.fx.fadeIn('#master', true);
				}
			}
		}
    }
</script>