/**
 * Created by Chamberlain on 3/30/2018.
 */
import '../../libs/extensions';
import autoOpen from './auto-open';

$$$(() => {
	$$$.io = io();

	autoOpen();

	trace("entry.js: YAYE!");
});