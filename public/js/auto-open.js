/**
 * Created by Chamberlain on 4/4/2018.
 */

export default function SELF() {
	SELF.autoOpenID = setInterval(() => {
		const body = document.body;
		$.get({
			url: '/auto-open-check',
			success: data => {
				TweenMax.to(body, 0.8, {alpha:1.0, scale:1.0, ease: Sine.easeOut});
			},
			error: err => {
				TweenMax.to(body, 0.8, {alpha:0.2, scale:0.9, ease: Sine.easeInOut});
			}
		});
	}, 1000);

	$$$.io.on('file-changed', file => {
		const ext = (file || '').ext();

		switch(ext) {
			case 'css':
				$('link[hot-reload]').each((i, link) => {
					link.href = link.href.split('?')[0] + "?id=" + $$$.randID();
				});
				break;
			case 'html':
			case 'vue': trace("Vue file changed: " + file); break;
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
}