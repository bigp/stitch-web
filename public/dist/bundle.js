/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var timeStart = new Date().getTime();
var _default = {
  mounted: function mounted() {
    var _this = this;

    var menu = this.$lookup('menu');
    var homeMenu = this.$app.homeMenu;
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - timeStart;

    if (timeDiff < 1000) {
      trace("Showing the Home-Screen mode-selector: " + timeDiff);

      _.defer(function () {
        _this.$app.showModeSelector();

        menu.reset(homeMenu);
      });
    }
  }
};
exports.default = _default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var Recents = {
  props: ['field', 'source', 'label'],
  methods: {
    convertToObj: function convertToObj(item) {
      var obj = {};
      obj[this.field] = item;
      return obj;
    }
  },
  template: "<div>Recent {{label}}:\n          <ul>\n           <li v-for=\"(item, i) in source\">\n            <goto :to=\"convertToObj(item)\">{{item}}</goto>\n           </li>\n          </ul>\n      </div>"
};
var _default = {
  data: function data() {
    return {
      recentBrands: 'starbucks,tim horton,second cup'.split(','),
      recentCampaigns: 'coffee,frozen drink,juice'.split(','),
      recentAds: 'test1,test2,test3'.split(',')
    };
  },
  computed: {
    menusExceptProject: function menusExceptProject() {
      return this.$app.topmenus.filter(function (m) {
        return m.name !== 'Project';
      });
    }
  },
  components: {
    Recents: Recents
  }
};
exports.default = _default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {};
exports.default = _default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {};
exports.default = _default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {};
exports.default = _default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var _default = {
  props: ['source'],
  computed: {},
  methods: {}
};
exports.default = _default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var isOutside = true;
var EVENT_COLLAPSE_ALL = 'menu:collapseAll';
$(document).mouseup(function (e) {
  if (!isOutside) return;
  $$$.emit(EVENT_COLLAPSE_ALL);
});
var _default = {
  props: {
    'item': {
      required: true
    },
    'depth': {
      default: 0
    }
  },
  data: function data() {
    return {
      isOpened: false
    };
  },
  computed: {
    classNames: function classNames() {
      var lowname = !this.item || !this.item.name ? 'n-a' : this.item.name.toLowerCase();
      return 'menu-' + lowname + ' menu-depth-' + this.depth;
    },
    canExpand: function canExpand() {
      return this.item.children && this.item.children.length > 0;
    },
    siblings: function siblings() {
      var _this = this;

      var parent = this.$parent.item;

      if (parent && parent.children) {
        return parent.children.filter(function (f) {
          return f !== _this.item;
        });
      }

      return [];
    }
  },
  methods: {
    onMouseUp: function onMouseUp() {
      _.defer(function () {
        return isOutside = true;
      });
    },
    onMouseOver: function onMouseOver() {
      this.siblings.forEach(function (s) {
        return s.$vue.isOpened = false;
      });
      var kids = this.item.children; //if(kids) kids.forEach(k => k.$vue.isOpened = false);

      if (this.canExpand && this.depth > 0) this.isOpened = true;
    },
    onMouseDown: function onMouseDown() {
      isOutside = false;

      if (this.canExpand) {
        this.isOpened = !this.isOpened;

        if (!this.isOpened && this.depth === 0) {
          $$$.emit(EVENT_COLLAPSE_ALL);
        }

        return;
      }

      if (this.item.click) this.item.click();
      $$$.emit(EVENT_COLLAPSE_ALL);
    }
  },
  created: function created() {
    var _this2 = this;

    this.item.$vue = this;

    var closeFunc = function closeFunc() {
      return _this2.isOpened = false;
    };

    $$$.on(EVENT_COLLAPSE_ALL, closeFunc);
    this.$once('hook:destroyed', function () {
      $$$.off(EVENT_COLLAPSE_ALL, closeFunc);
    });
  }
};
exports.default = _default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var CRUMB_FIRST = '.breadcrumb .cr-0';
var _default = {
  computed: {},
  methods: {
    _fixStyle: function _fixStyle() {
      var _this = this;

      if (this._isFixing) return;
      this._isFixing = true;

      _.defer(function () {
        $(CRUMB_FIRST).setClassIf('cr-single', _this.$app.breadcrumbs.length === 1);
        _this._isFixing = false;
      });
    },
    init: function init() {
      var routeName = this.$app.getRouteName();
      var first = this.$app.topmenus.find(function (m) {
        return m.name.toLowerCase() === routeName;
      });
      this.reset(first);
    },
    reset: function reset(menus) {
      this.$app.breadcrumbs = _.castArray(menus || []);

      this._fixStyle();
    },
    pushMenu: function pushMenu(menu) {
      this.$app.breadcrumbs.push(menu);

      this._fixStyle();
    },
    popMenu: function popMenu() {
      if (this.$app.breadcrumbs.length === 1) {
        return $$$.fx.flashColor(CRUMB_FIRST, '#f00', '#fff');
      }

      this.$app.breadcrumbs.pop();

      this._fixStyle();
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$lookup('menu', this);
    $$$.PLEASE_TEST.settings(this).login(this).help(this).bug(this);

    var onKey = function onKey(e) {
      switch (e.key) {
        case ' ':
          _this2.pushMenu(_this2.$app.topmenus[1]);

          break;

        case 'Backspace':
          _this2.popMenu();

          break;
      }
    };

    $(document).keydown(onKey);
    this.$once('hook:destroyed', function () {
      $$$.off(EVENT_COLLAPSE_ALL, closeFunc);
    });
  }
};
exports.default = _default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
var _default = {
  methods: {
    send: function send() {
      trace("Sending bug report");
    }
  }
};
exports.default = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  methods: {
    send: function send() {
      trace("Get Tech Support!");
    }
  }
};
exports.default = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  methods: {
    login: function login() {
      $.post('./auth'); //				.then( loginData => {
      //					trace("LOGIN DATA is:");
      //					trace(loginData);
      //				})
      //				.catch( err => {
      //					trace("Error");
      //				})
    }
  }
};
exports.default = _default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  methods: {
    getCSS: function getCSS(menu) {
      var lowcase = menu.name.toLowerCase();
      return ['mode-' + lowcase, {
        selected: lowcase === this.$app.getRouteName()
      }];
    }
  }
};
exports.default = _default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  methods: {
    send: function send() {
      trace("Get Settings!");
    }
  }
};
exports.default = _default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menubarConfig = _interopRequireDefault(__webpack_require__(48));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var homeMenu = {
  name: 'Home',
  path: '/',
  color: '#456',
  icon: 'home',
  desc: 'Welcome to Stitch-Web!'
};
var _default = {
  data: function data() {
    return {
      title: 'Hello World',
      homeMenu: homeMenu,
      topmenus: [homeMenu, {
        name: 'Project',
        color: '#f80',
        icon: 'star',
        menus: _menubarConfig.default.PROJECT,
        desc: 'Create and Manage your projects and clients.'
      }, {
        name: 'Designer',
        color: '#c08',
        icon: 'object-group',
        menus: _menubarConfig.default.DESIGNER,
        desc: 'Draw and Import assets into a project.'
      }, {
        name: 'Animator',
        color: '#0c8',
        icon: 'play-circle',
        menus: _menubarConfig.default.ANIMATOR,
        desc: 'Bring your assets to life in a timeline interface.'
      }, {
        name: 'Invoices',
        color: '#08f',
        icon: 'file',
        menus: _menubarConfig.default.INVOICES,
        desc: 'Bill your clients and get paid!'
      }],
      breadcrumbs: [],
      filemenus: [],
      panels: []
    };
  },
  watch: {
    '$route': function $route() {
      var _this = this;

      this.$lookup('menu').init();

      _.defer(function () {
        return _this.$forceUpdate();
      });
    }
  },
  computed: {
    topmenu: function topmenu() {
      var routeName = this.$route.name.toLowerCase();
      return this.topmenus.find(function (f) {
        return f.name.toLowerCase() === routeName;
      });
    }
  },
  methods: {
    showModeSelector: function showModeSelector() {
      $$$.panelManager.push('mode-selector');
    },
    onMenuClick: function onMenuClick(menu) {
      if (!menu.cb) return this.showModeSelector();
      menu.cb(menu);
    },
    getMenuCSS: function getMenuCSS(menu) {
      if (!menu) menu = this.breadcrumbs[0];
      if (!menu) return '';
      var bgColor = tinycolor(menu.color || '#88f');
      return $$$.css.vars({
        bgColor: bgColor.toHexString(),
        bgColorDark: bgColor.darken(20).toHexString(),
        bgColorLight: bgColor.brighten(20).toHexString(),
        bgColorHover: bgColor.brighten(50).toHexString()
      });
    },
    getRouteName: function getRouteName() {
      return this.$router.currentRoute.path.split('/')[1];
    },
    getRoutePath: function getRoutePath(obj) {
      var r = this.$router.currentRoute;
      if (!obj) obj = r.params;else {
        _.forOwn(r.params, function (value, key) {
          if (!obj[key]) obj[key] = _.isUndefined(value) ? false : value;
        });
      }
      var link = [obj.name || r.name].pushIfExists(obj.brand, obj.campaign, obj.ad);
      return '/' + link.join('/');
    },
    gotoRoute: function gotoRoute(obj) {
      var isDifferentName = obj.name && obj.name !== this.getRouteName();
      var link = this.getRoutePath(obj);
      this.$router.push(link);

      if (isDifferentName) {
        this.$lookup('menu').init();
        $$$.fx.fadeIn('#master', true);
      }
    },
    menubar: function menubar() {
      var Tools = _menubarConfig.default.PROJECT[2];
      var Macro = Tools.children[0];
      if (!Tools.$vue) return;
      Tools.$vue.isOpened = true;
      Macro.$vue.isOpened = true;
    }
  },
  mounted: function mounted() {
    $$$.PLEASE_TEST.menubar(this);
  }
};
exports.default = _default;

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page page-project fullsize" },
    [
      _c(
        "outer",
        {
          staticClass: "page-project fullsize page-bg",
          style: _vm.$app.getMenuCSS()
        },
        [
          _c("div", { staticClass: "padded" }, [
            _c("h1", [_vm._v("Welcome to Stitch-Web!")]),
            _vm._v(" "),
            _c("div", { staticClass: "welcome padded-2 box-shadow" }, [
              _c("p", [
                _vm._v(
                  "This tool is designed to greatly improve your Creative Ads workflow!"
                )
              ]),
              _vm._v(" "),
              _c("p", [
                _vm._v("From concept to invoicing, you can do it all here!")
              ])
            ])
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page page-project fullsize" },
    [
      _c(
        "outer",
        { staticClass: "fullsize page-bg", style: _vm.$app.getMenuCSS() },
        [
          _c("Recents", {
            attrs: { label: "Brands", field: "brand", source: _vm.recentBrands }
          }),
          _vm._v(" "),
          _vm.brand
            ? _c(
                "div",
                [
                  _c("p", [
                    _vm._v("Name of the brand: "),
                    _c("b", [_vm._v('"' + _vm._s(_vm.brand) + '"')])
                  ]),
                  _vm._v(" "),
                  _c("Recents", {
                    attrs: {
                      label: "Campaigns",
                      field: "campaign",
                      source: _vm.recentCampaigns
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.campaign
            ? _c(
                "div",
                [
                  _c("p", [
                    _vm._v("Name of the campaign: "),
                    _c("b", [_vm._v('"' + _vm._s(_vm.campaign) + '"')])
                  ]),
                  _vm._v(" "),
                  _c("Recents", {
                    attrs: { label: "Ads", field: "ad", source: _vm.recentAds }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.ad
            ? _c("div", [
                _c("p", [
                  _vm._v("Name of the ad: "),
                  _c("b", [_vm._v('"' + _vm._s(_vm.ad) + '"')])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.campaign
            ? _c("div", [
                _c("h3", [_vm._v("Launch in:")]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "grid-50-50 project-launcher-box" },
                  _vm._l(_vm.menusExceptProject, function(menu, i) {
                    return _c(
                      "goto",
                      {
                        staticClass: "friendly-box",
                        style: _vm.$app.getMenuCSS(menu),
                        attrs: { to: { name: menu.name.toLowerCase() } }
                      },
                      [
                        _c("icon", { attrs: { name: menu.icon } }),
                        _vm._v(" " + _vm._s(menu.name) + "\n    ")
                      ],
                      1
                    )
                  })
                )
              ])
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "outer",
    {
      staticClass: "page page-designer fullsize page-bg",
      style: _vm.$app.getMenuCSS()
    },
    [
      _c("p", [_vm._v("Designer panel")]),
      _vm._v(" "),
      _vm.brand
        ? _c("div", [
            _vm._v(
              "\n  The brand you are designing is: " +
                _vm._s(_vm.brand) +
                "\n  "
            ),
            _vm.campaign
              ? _c("i", [_vm._v(", " + _vm._s(_vm.campaign))])
              : _vm._e(),
            _vm._v(" "),
            _vm.ad ? _c("i", [_vm._v(", " + _vm._s(_vm.ad))]) : _vm._e()
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "outer",
    {
      staticClass: "page page-animator fullsize page-bg",
      style: _vm.$app.getMenuCSS()
    },
    [
      _vm._v("\n Animator 101.\n\n "),
      _vm.brand
        ? _c("div", [
            _vm._v(
              "\n  The brand you are animating is: " +
                _vm._s(_vm.brand) +
                "\n  "
            ),
            _vm.campaign
              ? _c("i", [_vm._v(", " + _vm._s(_vm.campaign))])
              : _vm._e(),
            _vm._v(" "),
            _vm.ad ? _c("i", [_vm._v(", " + _vm._s(_vm.ad))]) : _vm._e()
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "outer",
    {
      staticClass: "page page-invoices fullsize page-bg",
      style: _vm.$app.getMenuCSS()
    },
    [
      _vm._v("\n Invoices\n\n "),
      _vm.brand
        ? _c("div", [
            _vm._v(
              "\n  The brand you are invoicing is: " +
                _vm._s(_vm.brand) +
                "\n  "
            ),
            _vm.campaign
              ? _c("i", [_vm._v(", " + _vm._s(_vm.campaign))])
              : _vm._e(),
            _vm._v(" "),
            _vm.ad ? _c("i", [_vm._v(", " + _vm._s(_vm.ad))]) : _vm._e()
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "pointer menu-bar" },
    _vm._l(_vm.source, function(menuItem, i) {
      return _c("menu-item", { key: i, attrs: { item: menuItem } })
    })
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      class: "menu-item " + _vm.classNames,
      on: {
        mouseover: function($event) {
          _vm.onMouseOver()
        }
      }
    },
    [
      _c(
        "i",
        {
          staticClass: "menu-label",
          on: {
            mousedown: function($event) {
              _vm.onMouseDown()
            },
            mouseup: function($event) {
              _vm.onMouseUp()
            }
          }
        },
        [
          _vm.item.icon
            ? _c("icon", { attrs: { name: _vm.item.icon } })
            : _vm._e(),
          _vm._v(" "),
          _c("i", [_vm._v(_vm._s(_vm.item.name))])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "ul",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.canExpand && _vm.isOpened,
              expression: "canExpand && isOpened"
            }
          ],
          class: "submenu submenu-depth-" + (_vm.depth + 1)
        },
        _vm._l(_vm.item.children, function(kid, i) {
          return _c("menu-item", {
            key: i,
            attrs: { depth: _vm.depth + 1, item: kid }
          })
        })
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "top-bar" },
    [
      _c(
        "ul",
        { staticClass: "breadcrumb pointer" },
        _vm._l(_vm.$app.breadcrumbs, function(menu, i) {
          return _c(
            "li",
            {
              class: "crumb cr-" + i,
              style: _vm.$app.getMenuCSS(menu),
              on: {
                click: function($event) {
                  _vm.$app.onMenuClick(menu)
                }
              }
            },
            [
              _c("icon", { attrs: { name: menu.icon } }),
              _vm._v(" "),
              _c("i", [_vm._v(_vm._s(menu.name))])
            ],
            1
          )
        })
      ),
      _vm._v(" "),
      _c("menu-bar", { attrs: { source: _vm.$app.topmenu.menus } }),
      _vm._v(" "),
      _c(
        "ul",
        { staticClass: "pointer", attrs: { id: "right-bar" } },
        [
          _c("icon", {
            directives: [
              {
                name: "open-panel",
                rawName: "v-open-panel",
                value: "login",
                expression: "'login'"
              }
            ],
            attrs: { name: "user", id: "user-icon" }
          }),
          _vm._v(" "),
          _c("icon", {
            directives: [
              {
                name: "open-panel",
                rawName: "v-open-panel",
                value: "settings",
                expression: "'settings'"
              }
            ],
            attrs: { name: "cog" }
          }),
          _vm._v(" "),
          _c("icon", {
            directives: [
              {
                name: "open-panel",
                rawName: "v-open-panel",
                value: "help",
                expression: "'help'"
              }
            ],
            attrs: { name: "question-circle" }
          }),
          _vm._v(" "),
          _c("icon", {
            directives: [
              {
                name: "open-panel",
                rawName: "v-open-panel",
                value: "bug",
                expression: "'bug'"
              }
            ],
            attrs: { name: "bug" }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "panel",
    { attrs: { id: "bug-report", header: "Bug Report", subclasses: "debug" } },
    [
      _c("field", {
        attrs: { name: "firstName", label: "First Name", value: "First Name" }
      }),
      _vm._v(" "),
      _c("textarea", {
        attrs: { id: "", placeholder: "Enter your bug here..." }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "panel",
    { attrs: { id: "help", header: "Help" } },
    [
      _c("field", {
        attrs: { name: "firstName", label: "First Name", value: "First Name" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "panel",
    { attrs: { id: "user-login", header: "User Login" } },
    [
      _c("field", {
        attrs: { name: "email", label: "Email", value: "your-email@domain.com" }
      }),
      _vm._v(" "),
      _c("field", {
        attrs: { name: "password", label: "Password", value: "******" }
      }),
      _vm._v(" "),
      _c("field", {
        attrs: { name: "firstName", label: "First Name", value: "First Name" }
      }),
      _vm._v(" "),
      _c("field", {
        attrs: { name: "lastName", label: "Last Name", value: "Last Name" }
      }),
      _vm._v(" "),
      _c("field", {
        attrs: {
          name: "company",
          label: "Company / Organization",
          value: "Company"
        }
      }),
      _vm._v(" "),
      _c(
        "i",
        { staticClass: "control-bar" },
        [_c("btn", { attrs: { icon: "arrow-right" } }, [_vm._v("Login")])],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "panel",
    { ref: "panel", attrs: { id: "mode-selector", header: "Pick a Mode" } },
    _vm._l(_vm.$app.topmenus, function(menu, i) {
      return _c(
        "goto",
        {
          key: menu.name,
          staticClass: "box pointer",
          class: _vm.getCSS(menu),
          style: _vm.$app.getMenuCSS(menu),
          attrs: { to: { name: menu.name.toLowerCase() } },
          on: {
            click: function($event) {
              _vm.$refs.panel.fadeOut(true)
            }
          }
        },
        [
          _c("div", { staticClass: "table" }, [
            _c(
              "i",
              { staticClass: "menu-name" },
              [
                _c("icon", { attrs: { name: menu.icon } }),
                _vm._v(_vm._s(menu.name) + " -")
              ],
              1
            ),
            _vm._v(" "),
            _c("i", { staticClass: "menu-desc" }, [_vm._v(_vm._s(menu.desc))])
          ])
        ]
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("panel", { attrs: { id: "settings", header: "Settings" } }, [
    _c("div", { staticClass: "message" }, [_vm._v("Here is your settings...")])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "app fullsize" },
    [
      _c("top-bar"),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "master" } },
        [_c("router-view", { key: _vm.$route.fullPath })],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "fullsize", attrs: { id: "panels" } },
        _vm._l(_vm.panels, function(panel, p) {
          return _c(panel.name, { tag: "div" })
        })
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../bigp-anywhere/node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!../bigp-anywhere/src/client/vue/ui/btn.vue
//
//
//
//
//
//
//
/* harmony default export */ var btn = ({
  props: {
    obj: Object,
    emoji: String,
    icon: String
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0a3cbabe","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!../bigp-anywhere/src/client/vue/ui/btn.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [{ name: "forward-events", rawName: "v-forward-events" }],
      class: "btn " + (_vm.icon || _vm.emoji || "")
    },
    [
      _vm.emoji
        ? _c("i", {
            class: "v-align-mid em em-" + _vm.emoji,
            attrs: { "aria-hidden": "true" }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.icon
        ? _c("i", {
            class: "v-align-mid icon fa fa-" + _vm.icon,
            attrs: { "aria-hidden": "true" }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("i", [_vm._t("default")], 2)
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__(0);

// CONCATENATED MODULE: ../bigp-anywhere/src/client/vue/ui/btn.vue
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  btn,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "bigp-anywhere\\src\\client\\vue\\ui\\btn.vue"

/* hot reload */
if (false) {}

/* harmony default export */ var ui_btn = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../bigp-anywhere/node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!../bigp-anywhere/src/client/vue/ui/field.vue
//
//
//
//
//
//
//
//
//
/* harmony default export */ var field = ({
  props: ['name', 'label', 'value']
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2fff0eff","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!../bigp-anywhere/src/client/vue/ui/field.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", [
    _c("i", { staticClass: "field field-label" }, [_vm._v(_vm._s(_vm.label))]),
    _vm._v(" "),
    _c("i", { staticClass: "field field-value" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model:value",
            value: _vm.value,
            expression: "value",
            arg: "value"
          }
        ],
        attrs: { id: _vm.name, name: _vm.name, type: "text" },
        domProps: { value: _vm.value },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.value = $event.target.value
          }
        }
      })
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {}
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__(0);

// CONCATENATED MODULE: ../bigp-anywhere/src/client/vue/ui/field.vue
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  field,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "bigp-anywhere\\src\\client\\vue\\ui\\field.vue"

/* hot reload */
if (false) {}

/* harmony default export */ var ui_field = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../bigp-anywhere/node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!../bigp-anywhere/src/client/vue/ui/goto.vue
//
//
//
//
//
//
/* harmony default export */ var ui_goto = ({
  props: ['to']
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6de9c06e","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!../bigp-anywhere/src/client/vue/ui/goto.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      directives: [{ name: "forward-events", rawName: "v-forward-events" }],
      staticClass: "smart-link",
      attrs: { href: "javascript:;" },
      on: {
        mousedown: function($event) {
          _vm.$app.gotoRoute(_vm.to)
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__(0);

// CONCATENATED MODULE: ../bigp-anywhere/src/client/vue/ui/goto.vue
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  ui_goto,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "bigp-anywhere\\src\\client\\vue\\ui\\goto.vue"

/* hot reload */
if (false) {}

/* harmony default export */ var vue_ui_goto = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../bigp-anywhere/node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!../bigp-anywhere/src/client/vue/ui/icon.vue
//
//
//
//
//
//
/* harmony default export */ var icon = ({
  props: ['name']
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8b69fef8","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!../bigp-anywhere/src/client/vue/ui/icon.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "icon" }, [
    _c("i", {
      directives: [{ name: "forward-events", rawName: "v-forward-events" }],
      class: "fa fa-" + _vm.name
    })
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {}
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__(0);

// CONCATENATED MODULE: ../bigp-anywhere/src/client/vue/ui/icon.vue
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  icon,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "bigp-anywhere\\src\\client\\vue\\ui\\icon.vue"

/* hot reload */
if (false) {}

/* harmony default export */ var ui_icon = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../bigp-anywhere/node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!../bigp-anywhere/src/client/vue/ui/panel.vue
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var panel = ({
  props: ['header', 'subclasses'],

  data() {
    return {
      isVisible: false
    };
  },

  methods: {
    fadeOut(isForced) {
      $$$.fx.fadeOut(this.$el, () => {
        $$$.panelManager.pop();
      });
      isForced && this.$forceUpdate();
    }

  },

  mounted() {
    $$$.fx.fadeIn(this.$el, true);
    $$$.emit('dom-changed');
    $(this.$el).find('.modal-fader').click(() => {
      this.fadeOut();
    });
    $(window).keydown(e => {
      if (!this.isVisible) return;
      this.fadeOut();
    });
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e78e39ee","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!../bigp-anywhere/src/client/vue/ui/panel.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "panel-container fullsize" }, [
    _c("div", { staticClass: "modal-fader fullsize" }),
    _vm._v(" "),
    _c(
      "div",
      { class: "panel box-shadow is-centered " + _vm.subclasses },
      [
        _vm.header
          ? _c("h1", { staticClass: "center" }, [_vm._v(_vm._s(_vm.header))])
          : _vm._e(),
        _vm._v(" "),
        _vm._t("default"),
        _vm._v(" "),
        _c("btn", {
          attrs: { icon: "close" },
          on: {
            mousedown: function($event) {
              _vm.fadeOut()
            }
          }
        })
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {}
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__(0);

// CONCATENATED MODULE: ../bigp-anywhere/src/client/vue/ui/panel.vue
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  panel,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "bigp-anywhere\\src\\client\\vue\\ui\\panel.vue"

/* hot reload */
if (false) {}

/* harmony default export */ var ui_panel = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7869eab8_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7869eab8_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7869eab8_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_00_home_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\_pages\\page-00-home.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_eef76c36_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_eef76c36_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_eef76c36_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_01_project_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\_pages\\page-01-project.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_8b020924_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_8b020924_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_8b020924_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_02_designer_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\_pages\\page-02-designer.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_66b43b09_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_66b43b09_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_66b43b09_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_03_animator_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\_pages\\page-03-animator.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7dc035b2_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7dc035b2_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7dc035b2_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page_04_invoices_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\_pages\\page-04-invoices.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_73af0abe_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_73af0abe_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_73af0abe_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menu_bar_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\menus\\menu-bar.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_98cdfe10_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_98cdfe10_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_98cdfe10_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menu_item_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\menus\\menu-item.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_82b716dc_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_82b716dc_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_82b716dc_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_top_bar_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\menus\\top-bar.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_943ef822_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_943ef822_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_943ef822_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_bug_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\panels\\panel-bug.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_331ce8d6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_331ce8d6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_331ce8d6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_help_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\panels\\panel-help.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f51c5a4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f51c5a4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f51c5a4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_login_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\panels\\panel-login.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d8a8ff8_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d8a8ff8_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d8a8ff8_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_mode_selector_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\panels\\panel-mode-selector.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_de48e390_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_de48e390_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_de48e390_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_panel_settings_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\panels\\panel-settings.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _panel = _interopRequireDefault(__webpack_require__(33));

var _icon = _interopRequireDefault(__webpack_require__(32));

var _goto = _interopRequireDefault(__webpack_require__(31));

var _field = _interopRequireDefault(__webpack_require__(30));

var _btn = _interopRequireDefault(__webpack_require__(29));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ui = {};
ui["panel"] = _panel.default;
ui["icon"] = _icon.default;
ui["goto"] = _goto.default;
ui["field"] = _field.default;
ui["btn"] = _btn.default;
var _default = {
  ui: ui
};
exports.default = _default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Created by Chamberlain on 5/26/2018.
 */
function app() {
  return $$$.vue.$app;
}

var _default = {
  PROJECT: [{
    name: 'New',
    click: function click() {
      trace(app());
    }
  }, {
    name: 'Edit',
    click: function click() {
      alert('edit');
    }
  }, {
    name: 'Tools',
    children: [{
      name: 'Macro',
      children: [{
        name: 'Script1',
        click: function click() {
          trace("Script 1");
        }
      }, {
        name: 'Script2',
        click: function click() {
          trace("Script 2");
        }
      }]
    }, {
      name: 'Zoom +',
      click: function click() {
        trace("Zoom +");
      }
    }, {
      name: 'Zoom -',
      click: function click() {
        trace("Zoom -");
      }
    }]
  }],
  DESIGNER: [{}],
  ANIMATOR: [{}],
  INVOICES: [{}]
};
exports.default = _default;

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_708601c0_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0___default.a,
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_708601c0_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__WEBPACK_IMPORTED_MODULE_1__[/* render */ "a"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_708601c0_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__WEBPACK_IMPORTED_MODULE_1__[/* staticRenderFns */ "b"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\client\\vue\\app.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SELF;
var routes = [];
var lookups = {};

function SELF(config) {
  Vue.use(VueRouter);
  Vue.config.devtools = true;
  $$$.components = {};
  var optionalParams = '/:brand?/:campaign?/:ad?';
  var pageProps = {
    brand: {
      type: String
    },
    campaign: {
      type: String
    },
    ad: {
      type: String
    }
  };

  _.forOwn(config.pages, function (page, name) {
    var shortName = name.split('-').pop();
    var path = '/' + shortName + optionalParams;

    if (shortName === 'home') {
      $$$.loadVuePage('/', page);
      $$$.loadVuePage('/home', page);
    } else {
      $$$.loadVuePage(path, page, pageProps);
    }
  });

  _.forOwn(config.ui, function (ui, name) {
    return $$$.loadVueComp(name, ui);
  });

  _.forOwn(config.panels, function (ui, name) {
    return $$$.loadVueComp(name, ui);
  });

  _.forOwn(config.menus, function (ui, name) {
    return $$$.loadVueComp(name, ui);
  });

  routes.push({
    path: '/home/*',
    redirect: '/home'
  }); //Here's some Vue extensions (to quickly get to some common areas throughout the app).

  _.classy(Vue.prototype, {
    $app: function $app() {
      return this.$root.$children[0];
    },
    $global: function $global() {
      return window;
    }
  });

  Vue.prototype.$lookup = function (tag, assign) {
    if (assign) lookups[tag] = assign;
    if (assign === false) lookups[tag] = null;
    return lookups[tag];
  };

  registerDirectives({
    'forward-events': {
      inserted: function inserted(el, binding, vnode) {
        var listeners = vnode.context.$listeners;

        _.forOwn(listeners, function (cb, event) {
          el.addEventListener(event, cb);
        });
      }
    },
    'open-panel': {
      inserted: function inserted(el, binding, vnode) {
        var valueArr = binding.value.split(',');
        var panelName = valueArr[0];

        var cb = function cb(e) {
          return $$$.panelManager.push(panelName);
        };

        el.addEventListener('mousedown', cb);
        var methodName = valueArr.length > 1 ? valueArr[1] : panelName;

        if (vnode.context[methodName]) {
          traceError("Warning! You are overwriting an existing method with a [".concat(binding.rawName, "=\"").concat(binding.expression, "\"] directive!"));
        } //Create a method with the same name as the panel


        vnode.context[methodName] = cb;
      }
    }
  });
  registerComponents({
    'outer': {
      template: "<div class=\"inner\"><slot></slot></div>"
    }
  });
  return new Vue({
    el: '#app',
    router: new VueRouter({
      routes: routes
    }),
    template: '<App/>',
    components: {
      App: config.app
    }
  });
}

function registerComponents(comps) {
  _.forOwn(comps, function (comp, compName) {
    if (!comp.noDiv) {
      comp.template = "<div class=\"".concat(compName, "\">").concat(comp.template, "</div>");
    }

    $$$.loadVueComp(compName, comp);
  });
}

function registerDirectives(directives) {
  _.forOwn(directives, function (dir, dirName) {
    Vue.directive(dirName, dir);
  });
}

$$$.loadVueComp = function (name, compVue) {
  var comp = Vue.extend(compVue);
  $$$.components[name] = comp;
  Vue.component(name, comp);
};

$$$.loadVuePage = function (pagePath, pageVue, pageProps) {
  var watchers = _.remap(pageVue.props, function (key, value) {
    return {
      key: '$route.params.' + key,
      value: function value(_value) {
        trace(key + " changed to: " + _value); //this.refreshPage();
      }
    };
  });

  pageVue.watch = _.extend(watchers, pageVue.watch);
  pageVue.props = _.extend(pageProps, pageVue.props);
  var pageName = pagePath.split('/')[1] || 'home';
  var pageComp = Vue.extend(pageVue);
  routes.push({
    path: pagePath,
    name: pageName,
    props: true,
    component: pageComp
  });
};

_.classy($$$.panelManager = {}, {
  $panels: function $panels() {
    return $$$.vue.$app.panels;
  },
  push: function push(name, options) {
    if (!name.startsWith('panel-')) name = 'panel-' + name;

    var panelData = _.extend(options, {
      name: name
    });

    this.$panels.push(panelData);
    return panelData;
  },
  pop: function pop() {
    return this.$panels.pop();
  },
  remove: function remove(name) {
    if (!name.startsWith('panel-')) name = 'panel-' + name;
    var found = this.$panels.find(function (p) {
      return p.name === name;
    });
    if (!found) return traceError("Could not remove panel: " + name);
    this.$panels.remove(found);
    return found;
  }
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SELF;

/**
 * Created by Chamberlain on 4/4/2018.
 */
var LIMIT = 20;
var TIME_MS = 2000;

function SELF() {
  SELF._reattempts = 0;
  SELF.autoOpenID = setInterval(function () {
    var body = document.body;

    if (SELF._reattempts >= LIMIT) {
      if (SELF._reattempts === LIMIT) traceError("Too many reattempts: " + LIMIT);
      return;
    }

    $.get({
      url: '/auto-open-check',
      success: function success(data) {
        if (SELF._reattempts > 0) {
          trace('[SOCKET.IO] Reconnecting...');
          $$$.io.connect();
        }

        SELF._reattempts = 0;
        TweenMax.to(body, 0.8, {
          alpha: 1.0,
          scale: 1.0,
          ease: Sine.easeOut
        });
      },
      error: function error(err) {
        SELF._reattempts++;
        TweenMax.to(body, 0.8, {
          alpha: 0.2,
          scale: 0.9,
          ease: Sine.easeInOut
        });
      }
    });
  }, TIME_MS);
  $$$.io.on('file-changed', function (file) {
    var ext = (file || '').ext();

    switch (ext) {
      case 'vue':
        trace("Vue file changed: " + file);
        break;

      case 'css':
        $('link[hot-reload]').each(function (i, link) {
          link.href = link.href.split('?')[0] + "?id=" + $$$.randID();
        });
        $$$.emit('style-changed');
        break;

      case 'html':
      case 'js':
        $$$.emit('force-reload');
        break;

      case 'scss':
      case 'sass':
      case 'silent-types':
        break;

      default:
        trace("Another type changed: " + file);
        break;
    }
  });
  $$$.onLater('force-reload', 100, function () {
    window.location.reload(true);
  });
  return SELF;
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Chamberlain on 4/23/2018.
 */
$$$.PLEASE_TEST = _.delayTest(50, {
  login: false,
  bug: false,
  help: false,
  settings: false,
  menubar: true
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Chamberlain on 4/10/2018.
 */
$$$.fx = {
  fadeIn: function fadeIn(el, isForced) {
    var $el = $(el);
    var $vue = $el[0].__vue__;
    if ($vue) $vue.isVisible = true;
    $el.removeClass('init-hidden');
    $el.show();
    if (isForced) return TweenMax.fromTo($el, 0.2, {
      alpha: 0
    }, {
      alpha: 1
    });
    return TweenMax.to($el, 0.2, {
      alpha: 1
    });
  },
  fadeOut: function fadeOut(el, _onComplete) {
    var $el = $(el);
    var $vue = $el[0].__vue__;
    if ($vue) $vue.isVisible = false;
    TweenMax.to(el, 0.2, {
      alpha: 0,
      onComplete: function onComplete() {
        $(el).hide();
        _onComplete && _onComplete();
      }
    });
  },
  flashColor: function flashColor(el, from, to) {
    var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.3;
    return TweenMax.fromTo(el, time, {
      color: from
    }, {
      color: to,
      ease: Bounce.easeOut
    });
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Chamberlain on 4/6/2018.
 */
(function () {
  _.extend(EventEmitter.prototype, {
    onLater: function onLater(name, framesOrMS, cb) {
      if (framesOrMS < 0) {
        framesOrMS = -framesOrMS;
        return this.on(name, function () {
          return _.deferFrames(framesOrMS, cb);
        });
      }

      this.on(name, function () {
        setTimeout(cb, framesOrMS);
      });
    }
  });

  _.extend(jQuery.fn, {
    forEach: function forEach(cb) {
      this.each(function (e, el) {
        return cb($(el));
      });
    },
    center: function center() {
      var $window = $(window);
      this.css("position", "absolute");
      this.css("top", ($window.height() - this.height()) / 2 + $window.scrollTop() + "px");
      this.css("left", ($window.width() - this.width()) / 2 + $window.scrollLeft() + "px");
      return this;
    },
    setClassIf: function setClassIf(clazz, isTrue) {
      if (isTrue) this.addClass(clazz);else this.removeClass(clazz);
      return this;
    },
    findAndRemove: function findAndRemove(clazz) {
      this.find(clazz).removeClass(clazz);
      return this;
    }
  });

  function _css(styles, iterator) {
    var css = [];

    _.forIn(styles, function (value, key) {
      return css.push(iterator(value, key));
    });

    return css.join('; ');
  }

  $$$.css = function (styles) {
    return _css(styles, function (value, key) {
      return key + ': ' + value;
    });
  };

  $$$.css.vars = function (vars) {
    return _css(vars, function (value, key) {
      return '--' + key + ': ' + value;
    });
  };

  $$$.send = function (obj) {
    if (_.isString(obj)) obj = {
      url: obj
    };
    $$$.emit('load-start', obj.url);
    return new Promise(function (_then, _catch) {
      obj = _.merge({
        type: 'POST',
        data: {
          sending: 1
        },
        contentType: "application/json",
        dataType: 'json',
        success: function success(ok) {
          $$$.emit('load-end', obj.url);

          _then(ok);
        },
        error: function error(err) {
          $$$.emit('load-end', obj.url);

          _catch(err);
        }
      }, obj);
      $.ajax(obj);
    });
  };
})();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Created by Chamberlain on 2/2/2018.
 */
(function () {
  var isNode = (typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object';
  var GLOBALS = isNode ? global : window;

  function init() {
    GLOBALS.trace = console.log.bind(console);
    GLOBALS.traceError = console.error.bind(console);
    GLOBALS.traceClear = isNode ? function () {
      global['process'].stdout.write('\x1Bc');
    } : console.clear.bind(console);

    GLOBALS.traceProps = function (o) {
      trace(_.keys(o));
    };

    var traceOnceTags = {};

    GLOBALS.traceOnce = function (tag, msg) {
      if (!msg) msg = tag;else if (isNode) msg = "[".concat(tag.toUpperCase(), "]").bgRed + ": ".concat(msg);
      if (traceOnceTags[tag]) return;
      traceOnceTags[tag] = true;
      trace(msg);
    };

    _.extend(String.prototype, {
      has: function has() {
        for (var a = 0; a < arguments.length; a++) {
          var key = arguments[a];
          if (this.indexOf(key) > -1) return true;
        }

        return false;
      },
      combineWith: function combineWith(delim, arr) {
        return this.split(delim).concat(arr);
      },
      ext: function ext() {
        return this.split('.').pop().toLowerCase();
      },
      remove: function remove(str) {
        return this.replace(str, '');
      },
      removeAfter: function removeAfter(str) {
        var id = this.lastIndexOf(str);
        return this.substr(0, id);
      },
      fixSlash: function fixSlash() {
        return this.replace(/\\/g, '/');
      },
      mustStartWith: function mustStartWith(str) {
        return !this.startsWith(str) ? str + this : this;
      },
      mustEndWith: function mustEndWith(str) {
        return !this.endsWith(str) ? this + str : this;
      },
      toPath: function toPath() {
        var split = this.split('/');
        return {
          filename: split.pop(),
          dir: split.join('/')
        };
      },
      replaceBetween: function replaceBetween(tagStart, tagEnd, cbReplace) {
        var sep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '\n';
        var idStart,
            idEnd,
            lineOffset = 0;
        var lines = this.split(sep);

        var findNextIndex = function findNextIndex(tag) {
          return function (line, i) {
            return i >= lineOffset && line.has(tag);
          };
        };

        var findStart = findNextIndex(tagStart);
        var findEnd = findNextIndex(tagEnd);
        var ranges = [];

        do {
          idStart = lines.findIndex(findStart);
          idEnd = lines.findIndex(findEnd);
          if (idStart < 0 || idEnd < 0 || idStart === idEnd) break;

          if (idStart > idEnd) {
            traceError("Start and End tags are in == or reverse order: ".concat(idStart, " > ").concat(idEnd, " in...\n") + lines[0] + '...');
            break;
          }

          lineOffset = idEnd + 1;
          ranges.push({
            idStart: idStart,
            idEnd: idEnd,
            diff: idEnd - idStart + 1
          });
        } while (idStart > -1 && idEnd > -1);

        for (var r = ranges.length; --r >= 0;) {
          var range = ranges[r];

          if (cbReplace) {
            cbReplace(lines, range);
          } else {
            lines.splice(range.idStart, range.diff);
          }
        }

        return lines.join(sep);
      }
    });

    _.extend(Array.prototype, {
      last: function last() {
        return !this.length ? null : this[this.length - 1];
      },
      has: function has() {
        for (var a = 0; a < arguments.length; a++) {
          if (this.indexOf(arguments[a]) > -1) return true;
        }

        return false;
      },
      remove: function remove(item) {
        var id = this.indexOf(item);
        if (id === -1) return false;
        this.splice(id, 1);
        return true;
      },
      pushIfExists: function pushIfExists() {
        for (var a = 0; a < arguments.length; a++) {
          var value = arguments[a];
          if (!value) return this;
          this.push(value);
        }

        return this;
      }
    });

    _.extend($$$, {
      randID: function randID() {
        return new Date().getTime().toString(36);
      }
    });

    var tick = isNode ? process.nextTick : requestAnimationFrame;

    _.extend(_, {
      deferFrames: function deferFrames(frames, cb) {
        function _loop() {
          if (--frames > 0) return tick(_loop);
          cb();
        }

        _loop();
      },
      remap: function remap(obj, cb) {
        var result = {};

        _.keysIn(obj).forEach(function (key, value) {
          var cbResult = cb(key, value);
          result[cbResult.key] = cbResult.value;
        });

        return result;
      },
      getset: function getset(proto, obj) {
        _.forOwn(obj, function (getset, key) {
          Object.defineProperty(proto, key, getset);
        });
      },
      classy: function classy(obj, definition) {
        var getsets = {};
        var hasGetSets = false;

        _.forOwn(definition, function (valueOrFunc, name) {
          if (name.startsWith('$')) {
            //This is a getter:
            getsets[name] = {
              get: valueOrFunc
            };
            hasGetSets = true;
          } else if (name.startsWith('get_')) {
            var shortname = name.remove('get_');
            var setterName = 'set_' + shortname;
            var getset = {
              get: valueOrFunc
            };
            var setter = definition[setterName];
            if (setter) getset.set = setter;
            getsets[shortname] = getset;
            hasGetSets = true;
          } else if (!name.startsWith('set_')) {
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
      delayTest: function delayTest(defaultMS, testFlags) {
        var delays = {};

        var returnSelf = function returnSelf() {
          return testFlags;
        };

        _.forOwn(testFlags, function (value, name) {
          if (value === false || value < 1) {
            testFlags[name] = returnSelf;
            return;
          }

          delays[name] = value === true ? defaultMS : value;

          testFlags[name] = function (cb) {
            if (!_.isFunction(cb)) {
              var _this = cb;

              if (!_this[name]) {
                traceError("".concat(_this.name || _this, " does not have a \"").concat(name, "\" method to test!"));

                cb = function cb() {
                  return traceError("*test broken for \"".concat(name, "\"*"));
                };
              } else {
                cb = function cb() {
                  return _this[name]();
                };
              }
            }

            delays[name] && setTimeout(cb, delays[name]);
            return testFlags;
          };
        });

        testFlags._delays = delays;
        return testFlags;
      }
    });
  }

  if (!isNode) {
    var inits = [];

    var _$$$ = GLOBALS.$$$ = function (cb) {
      return inits.push(cb);
    };

    $(document).ready(function () {
      return inits.forEach(function (cb) {
        return cb();
      });
    });
  }

  init();
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(56), __webpack_require__(55)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(57);

__webpack_require__(54);

__webpack_require__(53);

__webpack_require__(52);

var _autoOpen = _interopRequireDefault(__webpack_require__(51));

var _vueSetup = _interopRequireDefault(__webpack_require__(50));

var _app = _interopRequireDefault(__webpack_require__(49));

var _common = _interopRequireDefault(__webpack_require__(47));

var _panelSettings = _interopRequireDefault(__webpack_require__(46));

var _panelModeSelector = _interopRequireDefault(__webpack_require__(45));

var _panelLogin = _interopRequireDefault(__webpack_require__(44));

var _panelHelp = _interopRequireDefault(__webpack_require__(43));

var _panelBug = _interopRequireDefault(__webpack_require__(42));

var _topBar = _interopRequireDefault(__webpack_require__(41));

var _menuItem = _interopRequireDefault(__webpack_require__(40));

var _menuBar = _interopRequireDefault(__webpack_require__(39));

var _page04Invoices = _interopRequireDefault(__webpack_require__(38));

var _page03Animator = _interopRequireDefault(__webpack_require__(37));

var _page02Designer = _interopRequireDefault(__webpack_require__(36));

var _page01Project = _interopRequireDefault(__webpack_require__(35));

var _page00Home = _interopRequireDefault(__webpack_require__(34));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Chamberlain on 3/30/2018.
 */
var compsPanels = {};
compsPanels["panel-settings"] = _panelSettings.default;
compsPanels["panel-mode-selector"] = _panelModeSelector.default;
compsPanels["panel-login"] = _panelLogin.default;
compsPanels["panel-help"] = _panelHelp.default;
compsPanels["panel-bug"] = _panelBug.default;
var compsMenus = {};
compsMenus["top-bar"] = _topBar.default;
compsMenus["menu-item"] = _menuItem.default;
compsMenus["menu-bar"] = _menuBar.default;
var compsPages = {};
compsPages["page-04-invoices"] = _page04Invoices.default;
compsPages["page-03-animator"] = _page03Animator.default;
compsPages["page-02-designer"] = _page02Designer.default;
compsPages["page-01-project"] = _page01Project.default;
compsPages["page-00-home"] = _page00Home.default;
$$$(function () {
  //Make this object an event-emitter:
  _.extend($$$, EventEmitter.prototype);

  $$$._events = {};
  $$$.io = io({
    reconnection: false
  });
  $$$.autoOpen = (0, _autoOpen.default)();
  $$$.vue = (0, _vueSetup.default)({
    app: _app.default,
    ui: _common.default.ui,
    panels: compsPanels,
    menus: compsMenus,
    pages: compsPages
  });
  $$$.vue.$lookup('menu').init();
  applySpecialSelectors();
});

function applySpecialSelectors() {
  window.addEventListener('resize', _isCentered);
  $$$.onLater('style-changed', -3, _isCentered);
  $$$.on('dom-changed', _isCentered);

  _.defer(_isCentered);

  TweenMax.set('.init-hidden', {
    alpha: 0
  });
  $('.init-hidden').removeClass('init-hidden').hide();

  _.defer(_isHighlighted); //////////////////////////////////////


  function _isCentered() {
    $('.is-centered').forEach(function (el) {
      return el.center();
    });
  }

  function _isHighlighted() {
    var jsBlocks = $('pre .code-javascript');
    jsBlocks.each(function (i, block) {
      trace(block);
      hljs.highlightBlock(block);
    });
  }
}

/***/ })
/******/ ]);