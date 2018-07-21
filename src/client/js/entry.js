/**
 * Created by Chamberlain on 3/30/2018.
 */
import '~extensions';
import '~bpa-js/helpers';
import './fx';
import './please-tests';
import AUTO_OPEN from '~bpa-js/auto-open';
import VUE_SETUP from '~bpa-js/vue-setup';

import App from '../vue/app.vue';

import common from '~bpa-vue/common.js';
import * as compsPanels from '../vue/panels/*';
import * as compsMenus from '../vue/menus/*';
import * as compsPages from '../vue/_pages/*';

$$$(() => {
	//Make this object an event-emitter:
	_.extend($$$, EventEmitter.prototype);
	$$$._events = {};

	$$$.io = io({ reconnection: false });
	$$$.autoOpen = AUTO_OPEN();
	$$$.vue = VUE_SETUP({
		app: App,
		ui: common.ui,
		panels: compsPanels,
		menus: compsMenus,
		pages: compsPages
	});

	$$$.vue.$lookup('menu').init();

	applySpecialSelectors();
});

function applySpecialSelectors() {
	window.addEventListener('resize', _isCentered);
	$$$.onLater('style-changed', -3, _isCentered);
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
		var jsBlocks = $('pre .code-javascript');
		jsBlocks.each((i, block) => {
			trace(block);
			hljs.highlightBlock(block);
		});
	}
}