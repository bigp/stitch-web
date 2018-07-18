/**
 * Created by Chamberlain on 7/6/2018.
 */

traceClear();

$$$.promptFile($$$.paths.experiments)
	.then(path => {
		traceClear();
		require(path);
	})
	.catch(err => traceError(err));