let conf;
function SELF(config) {
	conf = config;

	return SELF;
}

SELF.routes = function() {
	return {
		'post::/'(req, res, next) {
			trace(req.params);
			res.send('LOGIN PLZ');

		}
	}
}

module.exports = SELF;