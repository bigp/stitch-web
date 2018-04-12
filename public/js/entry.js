/**
 * Created by Chamberlain on 3/30/2018.
 */
import '../../libs/extensions';
import './helpers';
import './fx';
import AUTO_OPEN from './auto-open';
import VUE_SETUP from './vue-setup';
import MENU_SETUP from './menu-setup';

$$$(() => {
	$$$.io = io({ reconnection: false });
	$$$.menu = MENU_SETUP();
	$$$.vue = VUE_SETUP();
	$$$.autoOpen = AUTO_OPEN();

	$$$.menu.init();

	$$$.applySpecialSelectors();

	_.defer(() => {
		var jsBlocks = $('pre .code-javascript');
		jsBlocks.each((i, block) => {
			trace(block);
			hljs.highlightBlock(block);
		});
	})
});