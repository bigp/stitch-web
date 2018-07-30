/**
 * Created by Chamberlain on 3/30/2018.
 */
import '~extensions';
import '~bpa-js/helpers';
import AUTO_OPEN from '~bpa-js/auto-open';
import VUE_SETUP from '~bpa-js/vue-setup';

import App from './vue/app.vue';

import common from '~bpa-vue/common.js';
import * as projectUI from './vue/ui/*';

$$$(() => {
	$$$.io = io({ reconnection: false });
	$$$.autoOpen = AUTO_OPEN();
	$$$.vue = VUE_SETUP.init({
		app: App,
		components: _.merge(common.ui, projectUI),
		routes: {

		}
	});
//
	applySpecialSelectors();
});//

function applySpecialSelectors() {
	window.addEventListener('resize', isCentered);
	$$$.onLater('@style-changed', -3, isCentered);
	$$$.on('@dom-changed', isCentered);
	_.defer(isCentered);

	TweenMax.set('.init-hidden', {alpha:0});
	$('.init-hidden').removeClass('init-hidden').hide();

	_.defer(highlightJavascriptBlocks);
}

function isCentered() {
	$('.is-centered').forEach(el => el.center());
}

function highlightJavascriptBlocks() {
	$('pre .code-javascript').each((i, block) => {
		hljs.highlightBlock(block);
	});
}