/**
 * Created by Chamberlain on 4/6/2018.
 */
$$$.deferOnce = function(cb) {
	cb._isCalled = false;

	return function() {
		if(cb._isCalled) return;
		cb._isCalled = true;

		var _this = this;
		var args = arguments;

		_.defer(() => {
			cb._isCalled = false;
			cb.apply(_this, args);
		})
	}
}