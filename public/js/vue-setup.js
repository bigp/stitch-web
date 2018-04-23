import App from '../vue/app.vue';

import * as uiComps from '../vue/ui-*';
import * as pages from '../vue/page-*';

const routes = [];

export default function SELF(config) {
	Vue.use(VueRouter);
	Vue.config.devtools = true;

	$$$.components = {};

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
		$app: { get() { return this.$root.$children[0]; }},
		$super: { get() { return this.$children[0]; }},
		$global: { get() { return window; }}
	});

	const lookups = {};

	Vue.prototype.$lookup = function(tag, assign) {
		if(assign) lookups[tag] = assign;
		if(assign===false) lookups[tag] = null;

		return lookups[tag];
	};

	registerDirectives({
		'forward-events': {
			inserted(el, binding, vnode) {
				const listeners = vnode.context.$listeners;
				_.forOwn(listeners, (cb, event) => {
					el.addEventListener(event, cb);
				})
			}
		}
	})

	registerComponents({
		'icon': {
			props: ['name'],
			template: `<i :class="'fa fa-'+name" v-forward-events></i>`
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
		},
		'field': {
			props: ['name', 'label', 'value'],
			template: `
			<i class="field field-label">{{label}}</i>
			<i class="field field-value">
				<input :id="name" :name="name" type="text" v-model:value="value" />
			</i>
			`
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

function registerDirectives(directives) {
	_.forOwn(directives, (dir, dirName) => {
		Vue.directive(dirName, dir);
	})
}

$$$.loadVueComp = function(name, compVue) {
	var comp = Vue.extend(compVue);
	$$$.components[name] = comp;
	Vue.component(name, comp);
};

$$$.panelManager = {
	push(name, options) {
		if(!name.startsWith('panel-')) name = 'panel-' + name;
		const panelData = _.extend(options, {name: name});

		trace();

		this.$panels.push(panelData);
		return panelData;
	},
	pop() {
		return this.$panels.pop();
	},
	remove(name) {
		if(!name.startsWith('panel-')) name = 'panel-' + name;

		const found = this.$panels.find(p => p.name===name);
		if(!found) return traceError("Could not remove panel: " + name);

		this.$panels.remove(found);

		return found;
	}
};

_.getset($$$.panelManager, {
	$panels: { get() { return $$$.vue.$app.panels; }}
});

// $$$.newComponent = function(name, toElement) {
// 	const comp = $$$.components[name];
// 	if(!comp) throw 'Could not instantiate component by name: ' + name;
//
// 	const inst = new $$$.components[name]().$mount();
//
// 	if(toElement) $(toElement).append(inst.$el);
//
// 	return inst;
// };

// $$$.addPanel = function(name) {
// 	const panel = $$$.newComponent('panel-' + name, '#panels');
// 	$$$.fx.fadeIn(panel.$el);
// 	trace(panel.$el);
// 	//_.defer(() => );
// 	$$$.emit('dom-changed')
//
// 	return panel;
// };

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