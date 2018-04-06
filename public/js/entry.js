/**
 * Created by Chamberlain on 3/30/2018.
 */
import '../../libs/extensions';
import autoOpen from './auto-open';
import vueSetup from './vue-setup';

$$$(() => {
	$$$.io = io();

	vueSetup();
	autoOpen();

	trace("entry.js: YAYE!");
});