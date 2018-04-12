/**
 * Created by Chamberlain on 3/30/2018.
 */
const here = __dirname.fixSlash();
const root = here.remove('/libs');

module.exports = {
	root: root,
	libs: here,
	public: root + '/public',
	dist: root + '/public/dist',
	private: root + '/.private',
	data: root + '/.private/data',
	templates: root + '/templates',
};