/**
 * Created by Chamberlain on 2/6/2018.
 */
const fs = require('fs-extra');
const webpack = require('webpack');

function SELF(config) {
	const output = config.output;
	const compiler = webpack(config);

	SELF.compiler = compiler;
	SELF.fileChanged = output.path.mustEndWith('/').fixSlash() + output.filename;

	compiler.inputFileSystem = fs;
	compiler.outputFileSystem = $$$.memFS;

	return SELF;
}

function run(cbWarnings) {
	return new Promise((_then, _catch) => {
		SELF.compiler.run(function(err, stats) {
			if(err) return _catch(err);

			const ret = stats.toJson();

			if(ret.errors.length > 0) return _catch(ret.errors);
			if(ret.warnings.length > 0) cbWarnings && cbWarnings(ret.warnings);

			const asset = ret.assets[0];
			const size = (asset.size/1024).toFixed(2);
			trace([" WEBPACK OK ".bgGreen.white, ` ${size}KB `.bgMagenta.white, asset.name].join(' '));

			const fileChanged = SELF.fileChanged.replace('[name].js', asset.name);
			$$$.io.emit('file-changed', fileChanged);

			trace(fileChanged);

			_then(stats);
		});
	});
}

SELF.run = run;

module.exports = SELF;