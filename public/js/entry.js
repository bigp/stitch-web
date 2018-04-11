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
	$$$.io = io();

	$$$.menu = MENU_SETUP();

	VUE_SETUP();
	AUTO_OPEN();

	applySpecialSelectors();

	$$$.menu.init();
});

function applySpecialSelectors() {
	$$$.addEventAndExec('resize', () => $('.is-centered').center());

	TweenMax.set('.init-hidden', {alpha:0});
	$('.init-hidden').removeClass('init-hidden').hide();
}