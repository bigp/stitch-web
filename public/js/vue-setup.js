import setupComponents from './vue-components';

export default function SELF(config) {
	setupComponents();

	Vue.use(VueRouter);

	$$$.router = setupVueRouter();

	$$$.vue = new Vue({
		el: '#app',
		router: $$$.router,
		data: {
			helpers: {
				lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
			},
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
				var color = menu.color || '#88f';
				var colorHover = tinycolor(color).brighten(25).toHexString();
				return `--bgColor: ${color}; --bgColorHover: ${colorHover};`;
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

import pageHome from '../vue/page-home.vue';
import pageAnimator from '../vue/page-animator.vue';
import pageDesigner from '../vue/page-designer.vue';
import pageInvoices from '../vue/page-invoices.vue';
import pageProject from '../vue/page-project.vue';

const routes = [];

$$$.loadVueTemplate = function(path, str, cbBeforeEnter) {
	$$$.loadVuePage(path, {template: str}, cbBeforeEnter);
};

$$$.loadVuePage = function(path, pageVue, cbBeforeEnter) {
	routes.push({
		path: path,
		component: Vue.extend(pageVue),
		beforeEnter: cbBeforeEnter
	});
};

function setupVueRouter() {
	$$$.loadVuePage('/', pageHome, () => { _.defer(() => $$$.fx.fadeIn('#mode-selector')) });
	$$$.loadVuePage('/animator', pageAnimator);
	$$$.loadVuePage('/designer', pageDesigner);
	$$$.loadVuePage('/invoices', pageInvoices);
	$$$.loadVuePage('/project', pageProject);

	return new VueRouter({routes: routes});
}