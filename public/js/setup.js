/**
 * Created by Chamberlain on 3/30/2018.
 */

$$$(() => {
	$$$.io = io();
	$$$.io.on('file-changed', file => {
		const ext = (file || '').split('.').pop().toLowerCase();

		switch(ext) {
			case 'css':
				$('link[hot-reload]').each((i, link) => {
					link.href = link.href.split('?')[0] + "?id=" + $$$.randID();
				});
				break;
			case 'html':
			case 'js':
				trace("FORCE RELOAD: " + file);
				setTimeout(() => {
					window.location.reload(true);
				}, 100);
				break;
			default:
				trace("Another type changed: " + file);
				break;
		}
	});
});
