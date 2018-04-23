/**
 * Created by Chamberlain on 4/6/2018.
 */
// $$$.deferOnce = function(cb) {
// 	cb._isCalled = false;
//
// 	return function() {
// 		if(cb._isCalled) return;
// 		cb._isCalled = true;
//
// 		var _this = this;
// 		var args = arguments;
//
// 		_.defer(() => {
// 			cb._isCalled = false;
// 			cb.apply(_this, args);
// 		})
// 	}
// };

$$$.deferFrames = function(frames, cb) {
	function _loop() {
		if((--frames)>0) return requestAnimationFrame(_loop);

		cb();
	}

	_loop();
};

_.extend(EventEmitter.prototype, {
	onLater(name, framesOrMS, cb) {
		if(framesOrMS<0) {
			framesOrMS = -framesOrMS;
			return this.on(name, () => $$$.deferFrames(framesOrMS, cb))
		}

		this.on(name, () => {
			setTimeout(cb, framesOrMS);
		});
	}
});

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


$$$.send = function(obj) {
	if(_.isString(obj)) obj = {url: obj};

	$$$.emit('load-start', obj.url);

	return new Promise((_then, _catch) => {
		obj = _.merge({
			type: 'POST',
			data: {sending: 1},
			contentType: "application/json",
			dataType: 'json',
			success(ok) {
				$$$.emit('load-end', obj.url);

				_then(ok);
			},
			error(err) {
				$$$.emit('load-end', obj.url);

				_catch(err);
			}
		}, obj);

		$.ajax(obj);
	})
};