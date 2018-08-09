//$$$.web.ioAddEvent

trace('Index...');
// $$$.web.setupRoutes({
// 	'/api': {
// 		'/open-project'(req, res, next) {
// 			trace("Hello! Open-Project...");
//
// 			res.send('hello'); //{hello: 'world'}
// 			//next();
// 		}
// 	},
// });


$$$.web.app.use('/api/*', (req, res, next) => {
	res.send("HI!");
})