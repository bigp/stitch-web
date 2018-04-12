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
};

_.extend(jQuery.fn, {
	center() {
		const rect = $(window);
		this.css("position","absolute");
		this.css("top", ( rect.height() - this.height() ) / 2 + rect.scrollTop() + "px");
		this.css("left", ( rect.width() - this.width() ) / 2 + rect.scrollLeft() + "px");
		return this;
	},

	setClassIf(clazz, isTrue) {
		if(isTrue) this.addClass(clazz);
		else this.removeClass(clazz);

		return this;
	},

	findAndRemove(clazz) {
		this.find(clazz).removeClass(clazz);

		return this;
	}
});

$$$.addEventAndExec = function(event, func, target) {
	if(!target) target = window;
	target.addEventListener(event, func);
	func();
};

$$$.applySpecialSelectors = function() {
	$$$.addEventAndExec('resize', () => $('.is-centered').center());

	TweenMax.set('.init-hidden', {alpha:0});
	$('.init-hidden').removeClass('init-hidden').hide();
};

$$$.css = function(styles) {
	const css = [];
	_.forIn(styles, (value, key) => {
		css.push(`${key}: ${value}`);
	});

	return css.join('; ');
};

$$$.css.vars = function(vars) {
	const css = [];
	_.forIn(vars, (value, key) => {
		css.push(`--${key}: ${value}`);
	});

	return css.join('; ');
};
