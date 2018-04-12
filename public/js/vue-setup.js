import App from '../vue/app.vue';
import navTopBar from '../vue/nav-top-bar.vue';
import navModeSelector from '../vue/nav-mode-selector.vue';

import pageHome from '../vue/page-00-home.vue';
import pageProject from '../vue/page-01-project.vue';
import pageDesigner from '../vue/page-02-designer.vue';
import pageAnimator from '../vue/page-03-animator.vue';
import pageInvoices from '../vue/page-04-invoices.vue';

const routes = [];

//////////////////////////////////////////////////////////

export default function SELF(config) {
	Vue.use(VueRouter);
	Vue.config.devtools = true;

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

	//Here's some Vue extensions (to quickly get to some common areas throughout the app).
	_.getset(Vue.prototype, {
		$app: {
			get() { return this.$root.$children[0]; }
		}
	});

	const lookups = {};

	Vue.prototype.$lookup = function(tag, assign) {
		if(assign) lookups[tag] = assign;
		if(assign===false) lookups[tag] = null;

		return lookups[tag];
	};

	registerComponents({
		'icon': {
			props: ['name'],
			template: `<i :class="'fa fa-'+name"></i>`
		},
		'outer': { template: `<div class="inner"><slot></slot></div>` },
		'goto': {
			props: ['to'],
			noDiv: true,
			methods: {
				doClick(e) {
					this.$app.gotoRoute(this.to);
					this.$emit('click', e);
				}
			},
			template: `<a class="smart-link" href="javascript:;" @mousedown="doClick"><slot></slot></a>`
		}
	});

	return new Vue({
		el: '#app',
		router: new VueRouter({routes: routes}),
		template: '<App/>',
		components: { App }
	});
}

function registerComponents(comps) {
	_.forOwn(comps, (comp, compName) => {
		if(!comp.noDiv) {
			comp.template = `<div class="${compName}">${comp.template}</div>`;
		}

		$$$.loadVueComp(compName, comp);
	});
}

$$$.loadVueComp = (name, compVue) => Vue.component(name, Vue.extend(compVue));

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