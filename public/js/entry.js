/**
 * Created by Chamberlain on 3/30/2018.
 */
import '../../libs/extensions';
import './helpers';
import autoOpen from './auto-open';
import vueSetup from './vue-setup';
import menuSetup from './menu-setup';

$$$(() => {
	$$$.io = io();

	vueSetup();
	autoOpen();
	menuSetup();

	//TweenMax.set('.center-box', )
});