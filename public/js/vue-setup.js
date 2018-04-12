import setupComponents from './vue-components';

export default function SELF(config) {
	setupComponents();

	Vue.use(VueRouter);
	Vue.config.devtools = true;

	$$$.router = setupVueRouter();
	$$$.getRouteName = () => $$$.router.currentRoute.path.split('/')[1];

	return new Vue({
		el: '#app',
		router: $$$.router,
		data: {
			title: 'Hello World',
			menus: [],
			current: {
				menu: 0,
			}
		},
        methods: {
			onMenuClick(menu) {
				if(!menu.cb) return trace("No click callback for menu: " + menu.name);

				menu.cb(menu);
			},

			onModeSelected(mode) {
				if(!mode.cb) return trace("No mode-selected callback for mode: " + mode.name);

				mode.cb(mode, true);
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
				const isDifferentName = obj.name && obj.name!==$$$.getRouteName();
				const link = this.getRoute(obj);
				$$$.router.push(link);

				if(isDifferentName) {
					$$$.menu.init();
					$$$.fx.fadeIn('#master', true);
				}
			}
		},
        computed: {
			modes() {
				return $$$.menu.topmenus;
			}
		},
	});
}

//////////////////////// VUE-ROUTES:

import navTopBar from '../vue/nav-top-bar.vue';
import navModeSelector from '../vue/nav-mode-selector.vue';

import pageHome from '../vue/page-00-home.vue';
import pageProject from '../vue/page-01-project.vue';
import pageDesigner from '../vue/page-02-designer.vue';
import pageAnimator from '../vue/page-03-animator.vue';
import pageInvoices from '../vue/page-04-invoices.vue';


$$$.loadVueComp = function(name, compVue) {
	Vue.component(name, Vue.extend(compVue));
};

const routes = [];

$$$.loadVuePage = function(pagePath, pageVue, pageProps) {
	pageVue.props = _.extend(pageProps, pageVue.props);

	const watchers = _.remap(pageVue.props, (key, value) => {
		return {
			key: '$route.params.' + key,
			value(value) {
				trace(key + " changed to: " +  value);
				//this.refreshPage();
			}
		}
	});

	pageVue.watch = _.extend(watchers, pageVue.watch);

	const pageName = pagePath.split('/')[1] || 'home';
	const pageComp = Vue.extend(pageVue);

	routes.push({
		path: pagePath,
		name: pageName,
		props: true,
		component: pageComp
	});
};

function setupVueRouter() {
	const optionalParams = '/:brand?/:campaign?/:ad?';
	const pageProps = {
		brand: {type:String},
		campaign: {type:String},
		ad: {type:String},
	};

	$$$.loadVuePage('/animator' + optionalParams, pageAnimator, pageProps);
	$$$.loadVuePage('/designer' + optionalParams, pageDesigner, pageProps);
	$$$.loadVuePage('/invoices' + optionalParams, pageInvoices, pageProps);
	$$$.loadVuePage('/project' + optionalParams, pageProject, pageProps);
	$$$.loadVuePage('/', pageHome);

	$$$.loadVueComp('top-bar', navTopBar);
	$$$.loadVueComp('mode-selector', navModeSelector);

	return new VueRouter({routes: routes});
}