/**
 * Created by Chamberlain on 2/2/2018.
 */

(function() {
	var isNode = typeof window !== 'object';
	var GLOBALS = isNode ? global : window;

	function init() {
		GLOBALS.trace = console.log.bind(console);
		GLOBALS.traceError = console.error.bind(console);
		GLOBALS.traceClear = isNode ?
			function() { global['process'].stdout.write('\x1Bc'); } :
			console.clear.bind(console);
		GLOBALS.traceProps = function(o) {
			trace(_.keys(o));
		};

		const traceOnceTags = {};
		GLOBALS.traceOnce = (tag, msg) => {
			if(!msg) msg = tag;
			else if(isNode) msg = `[${tag.toUpperCase()}]`.bgRed + `: ${msg}`;

			if(traceOnceTags[tag]) return;
			traceOnceTags[tag] = true;

			trace(msg);
		}

		_.extend(String.prototype, {
			has() {
				for(var a=0; a<arguments.length;a++) {
					const key = arguments[a];
					if(this.indexOf(key) > -1) return true;
				}
				return false;
			},
			combineWith(delim, arr) {
				return this.split(delim).concat(arr);
			},
			ext() {
				return this.split('.').pop().toLowerCase()
			},
			remove(str) {
				return this.replace(str, '');
			},
			fixSlash() {
				return this.replace(/\\/g, '/');
			},
			mustEndWith(str) {
				return !this.endsWith(str) ? this + str : this;
			},
			toPath() {
				var split = this.split('/');
				return { filename: split.pop(), dir: split.join('/') };
			},
			replaceBetween(tagStart, tagEnd, cbReplace, sep='\n') {
				let idStart, idEnd, lineOffset = 0;
				const lines = this.split(sep);
				const findNextIndex = tag => (line, i) => i>=lineOffset && line.has(tag);
				const findStart = findNextIndex(tagStart);
				const findEnd = findNextIndex(tagEnd);
				const ranges = [];

				do {
					idStart = lines.findIndex(findStart);
					idEnd = lines.findIndex(findEnd);

					if(idStart<0 || idEnd<0 || idStart===idEnd) break;

					if(idStart>idEnd) {
						traceError(`Start and End tags are in == or reverse order: ${idStart} > ${idEnd} in...\n` + lines[0] + '...');
						break;
					}

					lineOffset = idEnd + 1;

					ranges.push({idStart, idEnd, diff: idEnd-idStart+1});

				} while(idStart>-1 && idEnd>-1);

				for(let r=ranges.length; --r>=0;) {
					let range = ranges[r];
					if(cbReplace) {
						cbReplace(lines, range);
					} else {
						lines.splice(range.idStart, range.diff);
					}
				}

				return lines.join(sep);
			}
		});

		_.extend(Array.prototype, {
			last() {
				return !this.length ? null : this[this.length-1];
			},
			has() {
				for(var a=0; a<arguments.length; a++) {
					if(this.indexOf(arguments[a]) > -1) return true;
				}
				return false;
			},
			remove(item) {
				var id = this.indexOf(item);
				if(id===-1) return false;
				this.splice(id, 1);
				return true;
			},
			pushIfExists() {
				for(var a=0; a<arguments.length; a++) {
					const value = arguments[a];
					if(!value) return this;
					this.push(value);
				}

				return this;
			}
		});

		_.extend($$$, {
			randID() {
				return new Date().getTime().toString(36);
			}
		});

		_.extend(_, {
			remap(obj, cb) {
				var result = {};
				_.keysIn(obj).forEach((key, value) => {
					var cbResult = cb(key, value);
					result[cbResult.key] = cbResult.value;
				})

				return result;
			},

			getset(proto, obj) {
				_.forOwn(obj, (getset, key) => {
					Object.defineProperty(proto, key, getset)
				});
			},

			classy(obj, definition) {
				const getsets = {};
				let hasGetSets = false;

				_.forOwn(definition, (valueOrFunc, name) => {
					if(name.startsWith('$')) {
						//This is a getter:
						getsets[name] = {get:valueOrFunc};
						hasGetSets = true;
					} else if(name.startsWith('get_')) {
						const shortname = name.remove('get_');
						const setterName = 'set_' + shortname;

						const getset = {get:valueOrFunc};
						const setter = definition[setterName];
						if(setter) getset.set = setter;

						getsets[shortname] = getset;
						hasGetSets = true;
					} else if(!name.startsWith('set_')) {
						obj[name] = valueOrFunc;
					}
				});

				hasGetSets && _.getset(obj, getsets);

				return obj;
			},

			/*
			 This is useful for creating 'test' configurations that needs a bit of delay
			 at the start of the app.

			 delayMS - The default time to delay tests properties using 'true' flags.
			   If the property uses a numeric value, it will delay by that value instead.

			 Example:
				 $$$.PLEASE_TEST = _.delayTest(100, {login: true});

				 //Then you can call it like this:

				  $$$.PLEASE_TEST.login( someLoginFunction );

				  //OR, if the context object has the same name as the test-flag:

				  var obj = {login: function() { ... }};
				  $$$.PLEASE_TEST.login(obj);

				  //You can also just pass "this" if it has that method too.
				  $$$.PLEASE_TEST.login(this);
			  */

			delayTest(defaultMS, testFlags) {
				const delays = {};

				_.forOwn(testFlags, (value, name) => {
					if(value===false || value<1) {
						testFlags[name] = _.noop;
						return;
					}

					delays[name] = value===true ? defaultMS : value;

					testFlags[name] = (cb) => {
						if(!_.isFunction(cb)) {
							const _this = cb;
							if(!_this[name]) {
								traceError(`${_this.name || _this} does not have a "${name}" method to test!`);
								cb = () => traceError(`*test broken for "${name}"*`);
							} else {
								cb = () => _this[name]();
							}
						}

						delays[name] && setTimeout(cb, delays[name]);
					}
				});

				testFlags._delays = delays;

				return testFlags;
			}
		});
	}

	if(!isNode) {
		const inits = [];
		const $$$ = GLOBALS.$$$ = cb => inits.push(cb);

		$(document).ready(() => inits.forEach(cb => cb()));
	}

	init();
})();

