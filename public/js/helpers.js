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

jQuery.fn.center = function () {
	const rect = $(window);
	this.css("position","absolute");
	this.css("top", ( rect.height() - this.height() ) / 2 + rect.scrollTop() + "px");
	this.css("left", ( rect.width() - this.width() ) / 2 + rect.scrollLeft() + "px");
	return this;
};

jQuery.fn.setClassIf = function (clazz, isTrue) {
	if(isTrue) this.addClass(clazz);
	else this.removeClass(clazz);

	return this;
};

$$$.addEventAndExec = function(event, func, target) {
	if(!target) target = window;
	target.addEventListener(event, func);
	func();
};

