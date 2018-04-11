/**
 * Created by Chamberlain on 4/10/2018.
 */
///////////////////////// VUE-COMPONENTS:

export default function setupComponents() {
	registerComponents({
		'icon': {
			props: ['name'],
			template: `<i :class="'fa fa-'+name"></i>`
		}
	})
}

function registerComponents(comps) {
	_.forOwn(comps, (comp, compName) => {
		if(!comp.noDiv) {
			comp.template = `<div class="${compName}">${comp.template}</div>`;
		}

		Vue.component(compName, Vue.extend(comp));
	});
}