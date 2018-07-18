/**
 * Created by Chamberlain on 7/6/2018.
 */

const thisPath = module.paths[0].split('\\');
const thisRoot = thisPath.slice(0, -1);
const thisLibs = thisRoot.join('/') + "/libs";

module.paths.unshift(thisLibs);

const test = require('test');

trace(test);