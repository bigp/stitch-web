/**
 * Created by Chamberlain on 2/5/2018.
 */
const sass = require('node-sass');
const path = require('path');
const moment = require('moment');
const sassRegex = /\.s(a|c)ss$/;

function SELF() {
	$$$.watcher.add(sassRegex, '*', path => renderInMemory(path));

	const cssStyles = $$$.paths.public + '/css/styles.scss';
	let lastCompiled = 0;

	function renderInMemory(dir) {
		const cssPath = path.resolve(cssStyles.replace(sassRegex, '.css')).fixSlash();

		var now = new Date().getTime();
		var diff = now - lastCompiled;
		if(diff < 500) return; //trace("Too soon to recompile: " + dir + " : " + diff);

		lastCompiled = now;

		$$$.memFS.mkdirpSync(cssPath.toPath().dir);

		sass.render({file: cssStyles},
			(err, result) => {
				if(err) throw err;

				$$$.memFS.writeFile(cssPath, result.css, onSassComplete);
			}
		);

		function onSassComplete(err) {
			if(err) throw err;

			$$$.io.emit('file-changed', cssPath);
		}
	}

	return SELF;
}

module.exports = SELF;