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
		data: () => ({
			title: 'Hello World',
			menus: [],
			current: {
				menu: 0,
			}
		}),
		methods: {
			onMenuClick(menu) {
				if(!menu.cb) return trace("No click callback for menu: " + menu.name);

				menu.cb(menu);
			},

			onModeSelected(mode) {
				if(!mode.cb) return trace("No mode-selected callback for mode: " + mode.name);

				mode.cb(mode, true);
			},

            getModes() {
				const menu = this.$lookup('menu');
				trace(menu);
				if(!menu) return [];

				return menu.topmenus;
			},

			getMenuCSS(menu) {
				if(!menu) menu = this.menus[0];
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
				$$$.router.push(link);

				if(isDifferentName) {
					$$$.menu.init();
					$$$.fx.fadeIn('#master', true);
				}
			}
		}
    }
</script>