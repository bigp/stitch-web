const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const sockets = [];
const handlers = [];
const debug = 0;

function SELF(config) {
	const webConfig = config.web;
	const ioConfig = config.io;
	SELF.app = app;
	SELF.express = express;
	SELF.server = server;

	SELF.setupIO(ioConfig || {});

	SELF.setupRoutes(webConfig.routes);

	webConfig.onError && app.use(webConfig.onError);
	
	SELF.listen(webConfig.port);

	return SELF;
}

SELF.setupRoutes = function(routes) {
	function _applyRoute(parent, route, routeKey, routeObj) {
		if(routeKey==='^') {
			routeKey = '/*';
			route = app;
		}

		if(_.isString(routeObj)) {
			if(routeKey.has('.')) {
				debug && trace("ROUTE DIRECT FILE: " + routeObj);
				return route.get(routeKey, (req, res, next) => {
					res.sendFile(routeObj);
				});
			} else {
				debug && trace("ROUTE STATIC DIR: " + routeObj);
				return route.use(express.static(routeObj));
			}
		}

		if(!_.isFunction(routeObj)) {
			return _recursive(route, routeKey, routeObj);
		}

		const routeArr = routeKey.split('::');
		const method = routeArr.length===1 ? 'get' : routeArr[0].toLowerCase();
		const subPath = routeArr.length===1 ? routeArr[0] : routeArr[1];

		debug && trace("ROUTE MIDDLEWARE: " + method.toUpperCase() + "::" + subPath);
		route[method](subPath, routeObj);
	}

	function _recursive(parent, path, routes) {
		const route = express.Router();
		debug && trace("ROUTE: " + path);

		_.keys(routes).forEach(routeKey => {
			const routeObj = routes[routeKey];

			if(_.isArray(routeObj)) {
				debug && trace("ROUTE ARRAY: " + routeObj.length);
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
		console.log(`STARTED SERVER ON PORT ${port} ...`.yellow);
	});

	return SELF;
};

SELF.setupIO = function(config) {
	const io = SELF.io = $$$.io = socketIO(server, config);

	io.on('connection', socket => {
		sockets.push(socket);

		debug && trace("Connected: ".yellow + socket.id);

		SELF.applyHandlers(socket);

		socket.on('disconnect', () => {
			sockets.remove(socket);

			debug && trace("Disconnected: ".red + socket.id);
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
