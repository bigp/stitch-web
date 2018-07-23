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
	});

	trace(common.ui);
	applySpecialSelectors();
});

function applySpecialSelectors() {
	window.addEventListener('resize', _isCentered);
	$$$.onLater('EVENT.style-changed', -3, _isCentered);
	$$$.on('dom-changed', _isCentered);
	_.defer(_isCentered);

	TweenMax.set('.init-hidden', {alpha:0});
	$('.init-hidden').removeClass('init-hidden').hide();

	_.defer(_isHighlighted);

	//////////////////////////////////////

	function _isCentered() {
		$('.is-centered').forEach(el => el.center());
	}

	function _isHighlighted() {
		var codeBlocks = $('pre .code-javascript');
		codeBlocks.each((i, block) => {
			trace(block);
			hljs.highlightBlock(block);
		});
	}
}