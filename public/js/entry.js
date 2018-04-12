/**
 * Created by Chamberlain on 3/30/2018.
 */
import '../../libs/extensions';
import './helpers';
import './fx';
import AUTO_OPEN from './auto-open';
import VUE_SETUP from './vue-setup';

$$$(() => {
	$$$.io = io({ reconnection: false });
	$$$.vue = VUE_SETUP();
	$$$.autoOpen = AUTO_OPEN();

	$$$.vue.$lookup('menu').init();

	$$$.applySpecialSelectors();

	_.defer(() => {
		var jsBlocks = $('pre .code-javascript');
		jsBlocks.each((i, block) => {
			trace(block);
			hljs.highlightBlock(block);
		});
	})
});