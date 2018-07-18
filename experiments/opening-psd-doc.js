/**
 * Created by Chamberlain on 7/6/2018.
 */

const fs = require('fs-extra');

const thisPath = module.paths[0].split('\\');
const thisRoot = thisPath.slice(0, -1);
const thisLibs = thisRoot.join('/') + "/libs";

module.paths.unshift(thisLibs);

const irvingPSD = './experiments/assets/irving.psd';
const PSD = require('psd');
const psd = PSD.fromFile(irvingPSD);
psd.parse();

const first = psd.image; //tree().children()[0];

//trace(psd.tree().export());
traceProps(first);

trace("OK...");
return;

const png = first.toPng();

let writeStream = fs.createWriteStream(irvingPSD.replace('.psd', '.png'));

png.pipe(writeStream);
png.on('finish', () => {
	trace("png COMPLETED!");
});

writeStream.on('finish', () => {
	trace("writeStream COMPLETED!");
});

trace("PSD...");

//trace();