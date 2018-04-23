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

		_.remap = (obj, cb) =>{
			var result = {};
			_.keysIn(obj).forEach((key, value) => {
				var cbResult = cb(key, value);
				result[cbResult.key] = cbResult.value;
			})

			return result;
		}

		_.getset = (proto, obj) => {
			_.forOwn(obj, (getset, key) => {
				Object.defineProperty(proto, key, getset)
			});
		}
	}

	if(!isNode) {
		const inits = [];
		const $$$ = GLOBALS.$$$ = cb => inits.push(cb);

		$(document).ready(() => inits.forEach(cb => cb()));
	}

	init();
})();

