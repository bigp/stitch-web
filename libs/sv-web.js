const fs = require('fs-extra');
const express = require('express');
const app = express();
const http = require('http');
const mime = require('mime-types');
const server = http.createServer(app);
const socketIO = require('socket.io');
const sockets = [];
const handlers = [];

function debug() {
	//trace.apply(null, arguments);
}

function SELF(config) {
	SELF.app = app;
	SELF.express = express;
	SELF.server = server;

	SELF.initSocketIO(config.io || {});

	const webConfig = config.web;
	SELF.setupRoutes(webConfig.routes);

	process.nextTick(() => {
		app.use(webConfig.onError || SELF.onError);

		SELF.listen(webConfig.port);
	});

	return SELF;
}

SELF.onError = (err, req, res, next) => {
	trace(err);
	res.status(404).send();
};

SELF.serveFromMemory = function(req, res, next) {
	const localURI = $$$.paths.public + req.url.split('?')[0];
	if(!req.url.has('.') || !$$$.memFS.existsSync(localURI)) {
		return next();
	}

	res.contentType(mime.lookup(localURI));
	return res.send($$$.memFS.readFileSync(localURI));
};

SELF.setupRoutes = function(routes) {
	function _applyRoute(parent, route, routeKey, routeObj) {
		if(routeKey==='^') {
			routeKey = '/*';
			route = app;
		}

		if(_.isString(routeObj)) {
			if(routeKey.has('.')) {
				debug("ROUTE DIRECT FILE: " + routeObj);
				return route.get(routeKey, (req, res, next) => {
					res.sendFile(routeObj);
				});
			} else {
				debug("ROUTE STATIC DIR: " + routeObj);
				return route.use(express.static(routeObj));
			}
		}

		if(!_.isFunction(routeObj)) {
			return _recursive(route, routeKey, routeObj);
		}

		const routeArr = routeKey.split('::');
		const method = routeArr.length===1 ? 'get' : routeArr[0].toLowerCase();
		const subPath = routeArr.length===1 ? routeArr[0] : routeArr[1];

		debug("ROUTE MIDDLEWARE: " + method.toUpperCase() + "::" + subPath);
		route[method](subPath, routeObj);
	}

	function _recursive(parent, path, routes) {
		const route = express.Router();
		debug("ROUTE: " + path);

		_.keys(routes).forEach(routeKey => {
			const routeObj = routes[routeKey];

			if(_.isArray(routeObj)) {
				debug("ROUTE ARRAY: " + routeObj.length);
				return routeObj.forEach(obj => _applyRoute(parent, route, routeKey, obj));
			}

			_applyRoute(parent, route, routeKey, routeObj);
		});

		//Attach the route to the APP or PARENT-ROUTE:
		if(parent==route) return;
		parent.use(path, route);
	}

	_recursive(app, '/', routes);

	return SELF;
};

SELF.listen = function(port) {
	server.listen(port || 3000, () => {
		trace(`STARTED SERVER ON PORT ${port} ...`.yellow);
	});

	return SELF;
};

SELF.initSocketIO = function(config) {
	const io = SELF.io = $$$.io = socketIO(server, config);

	io.on('connection', socket => {
		sockets.push(socket);

		debug("Connected: ".yellow + socket.id);

		SELF.applyHandlers(socket);

		socket.on('disconnect', () => {
			sockets.remove(socket);

			debug("Disconnected: ".red + socket.id);
		});
	});
};

SELF.addEvent = function(event, cb) {
	handlers.push({event:event, cb:cb});

	sockets.forEach(socket => socket.on(event, cb));
};

SELF.applyHandlers = function(socket) {
	handlers.forEach(hd => socket.on(hd.event, hd.cb));
};

module.exports = SELF;
