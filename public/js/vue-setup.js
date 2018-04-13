import App from '../vue/app.vue';

import * as uiComps from '../vue/ui-*';
import * as pages from '../vue/page-*';

const routes = [];

export default function SELF(config) {
	Vue.use(VueRouter);
	Vue.config.devtools = true;

	const optionalParams = '/:brand?/:campaign?/:ad?';
	const pageProps = {
		brand: {type:String},
		campaign: {type:String},
		ad: {type:String},
	};

	_.forOwn(pages, (page, name) => {
		const shortName = name.split('-').pop();
		const path = '/' + shortName + optionalParams;
		if(shortName==='home') {
			$$$.loadVuePage('/', page);
			$$$.loadVuePage('/home', page);
		} else {
			$$$.loadVuePage(path, page, pageProps);
		}
	});

	_.forOwn(uiComps, (ui, name) => {
		const shortName = name.remove('ui-');
		$$$.loadVueComp(shortName, ui);
	});

	routes.push({path: '/home/*', redirect: '/home'});

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
	pageVue.props = _.extend(pageProps, pageVue.props);

	const pageName = pagePath.split('/')[1] || 'home';
	const pageComp = Vue.extend(pageVue);

	routes.push({
		path: pagePath,
		name: pageName,
		props: true,
		component: pageComp
	});
};