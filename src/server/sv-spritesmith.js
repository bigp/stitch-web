/**
 * Created by Chamberlain on 4/22/2018.
 */
const spritesmith = require('spritesmith');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const DataURI = require('datauri');
const datauri = new DataURI();

function SELF(config) {
	SELF.config = config.spritesmith || config;
}

SELF.run = function() {
	const config = SELF.config;
	const result = {};

	return SELF.render(sprites, result)
		.then(data => SELF.compressImage(data.image, result))
		.then(data => SELF.toDataURI(data, result))
		.then(data => {
			result.images = [data];
			return result;
		});
};

SELF.render = function(sprites) {
	const config = SELF.config;
	const configSmith = {src: sprites, padding: config.padding};

	return new Promise((_then, _catch) => {
		spritesmith.run(configSmith, (err, data) => {
			if(err) return _catch(err);

			const anims = {}, frames = [], results = {
				size: data.properties,
				frames: frames,
				animations: anims
			};

			data.coordinates = _.remap(data.coordinates, (fullpath, value) => {
				return {
					key: fullpath.split('/').pop().remove('.png'),
					value:value
				}
			});

			_.forOwn(data.coordinates, (frame, key) => {
				anims[key] = frames.length;
				frames.push([frame.x, frame.y, frame.width, frame.height]);
			});

			_then(results);
		});
	})
}

SELF.compressImage = function(imageBuffer) {
	const config = SELF.config;

	return new Promise((_then, _catch) => {
		pngquantCompress(imageBuffer, config.quality, image => {
			const compressedDataURI = SELF.toDataURI(imageBuffer);

			_then(compressedDataURI);
		});
	});
};

// function pngquantCompress( imgBuffer, quality, cb ) {
// 	const configPNGQuant = imageminPngquant({quality: quality});
//
// 	imagemin.buffer( imgBuffer, {plugins: [configPNGQuant]} );
//
// 	function _imageminBuffer(img, quality) {
// 		imageminBuffer(img, quality)
// 			.then( cb )
// 			.catch( err => {
// 				trace(('PNGQuant failed with quality: ' + quality).red);
// 				imageminBuffer(img, '50-100')
// 					.then( cb )
// 					.catch( baderr=> {
// 						trace(("imageminBuffer FAILED: " + baderr).red);
// 						throw baderr;
// 					});
// 			});
// 	}
//
// 	if(!_.isString(imgBuffer)) {
// 		return _imageminBuffer(imgBuffer, quality, cb);
// 	}
//
// 	//Read the file-buffer if a URL was supplied instead:
// 	fs.readFile(imgBuffer, (err, data) => {
// 		if(err) throw err;
// 		_imageminBuffer(data, quality, cb);
// 	});
// };

SELF.toDataURI = function(buffer, result) {
	datauri.format('.png', buffer);
	const content = datauri.content;
	if(result) result.datauri = content;
	return content;
};

module.exports = SELF;