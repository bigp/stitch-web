<template>
    <div>
        <top-bar></top-bar>

        <div id="master">
            <router-view></router-view>
        </div>

        <mode-selector></mode-selector>
    </div>
</template>
<script>
    export default {
		data() {
			return {
				title: 'Hello World',

				homeMenu: {name: 'Home', color: '#456', icon: 'home', desc: 'Home Screen'},

				topmenus: [
					{name: 'Project',  color: '#f80', icon: 'star', desc: 'Create and Manage your projects and clients.'},
					{name: 'Designer', color: '#c08', icon: 'object-group', desc: 'Draw and Import assets into a project.'},
					{name: 'Animator', color: '#0c8', icon: 'play-circle', desc: 'Bring your assets to life in a timeline interface.'},
					{name: 'Invoices', color: '#08f', icon: 'file', desc: 'Bill your clients and get paid!'},
				],

				breadcrumbs: []
			}
        },

        methods: {
			onMenuClick(menu) {
				if(!menu.cb) return $$$.fx.fadeIn('#mode-selector');

				menu.cb(menu);
			},

			getMenuCSS(menu) {
				if(!menu) menu = this.breadcrumbs[0];
				if(!menu) return '';

				const bgColor = tinycolor(menu.color || '#88f');

				return $$$.css.vars({
					bgColor: bgColor.toHexString(),
					bgColorHover: bgColor.brighten(25).toHexString(),
					bgColorLight: bgColor.lighten(5).toHexString(),
				});
			},
            getRouteName() {
				return this.$router.currentRoute.path.split('/')[1];
            },
			getRoute(obj) {
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
				const isDifferentName = obj.name && obj.name!==this.$app.getRouteName();
				const link = this.getRoute(obj);
				this.$router.push(link);

				if(isDifferentName) {
					this.$lookup('menu').init();
					$$$.fx.fadeIn('#master', true);
				}
			}
		}
    }
</script>