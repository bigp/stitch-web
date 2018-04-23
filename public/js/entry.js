/**
 * Created by Chamberlain on 3/30/2018.
 */
import '../../libs/extensions';
import './helpers';
import './fx';
import AUTO_OPEN from './auto-open';
import VUE_SETUP from './vue-setup';

$$$(() => {
	//Make this object an event-emitter:
	_.extend($$$, EventEmitter.prototype);
	$$$._events = {};

	$$$.io = io({ reconnection: false });
	$$$.vue = VUE_SETUP();
	$$$.autoOpen = AUTO_OPEN();

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
		trace("Recenter...");
		$('.is-centered').center();
	}

	function _isHighlighted() {
		var jsBlocks = $('pre .code-javascript');
		jsBlocks.each((i, block) => {
			trace(block);
			hljs.highlightBlock(block);
		});
	}
}