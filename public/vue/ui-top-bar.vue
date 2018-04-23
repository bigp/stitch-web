<template>
    <div id="top-bar">
        <ul class="breadcrumb pointer">
            <li v-for="(menu, i) in $app.breadcrumbs"
                :class="'crumb cr-' + i"
                :style="$app.getMenuCSS(menu)"
                @click='$app.onMenuClick(menu)'>
                <icon :name="menu.icon"></icon>
                <i>{{menu.name}}</i>
            </li>
        </ul>
        <ul id="menu-bar" class="pointer">
            <li>File</li>
            <li>Edit</li>
            <li>View</li>
            <li>Tools</li>
        </ul>
        <ul id="right-bar" class="pointer">
            <icon name="user" id="user-icon" @mousedown="login()"></icon>
            <icon name="question-circle"></icon>
            <icon name="bug"></icon>
        </ul>
    </div>
</template>

<script>

let _this;
const CRUMB_0 = '.breadcrumb .cr-0';

$(document).keydown( e => {
    switch(e.key) {
        case ' ': _this.pushMenu(_this.$app.topmenus[1]); break;
        case 'Backspace': _this.popMenu(); break;
    }
});

export default {
    computed: {

    },

    methods: {
        _fixStyle() {
            const _this = this;
            if(_this._isFixing) return;

            _.defer(function() {
                $(CRUMB_0).setClassIf('cr-single', _this.$app.breadcrumbs.length===1);
                _this._isFixing = false;
            });
        },

        init() {
            const routeName = this.$app.getRouteName();
            const first = this.$app.topmenus.find(m => m.name.toLowerCase()===routeName);
            this.reset(first);
        },

        reset(menus) {
            this.$app.breadcrumbs = _.castArray(menus || []);
            this._fixStyle();
        },

        pushMenu(menu) {
            this.$app.breadcrumbs.push(menu);
            this._fixStyle();
        },

        popMenu() {
            if(this.$app.breadcrumbs.length===1) {
                return TweenMax.fromTo(
                    CRUMB_0,
                    0.5,
                    {css: {color:'#f00'}},
                    {css: {color:'#fff'}, ease: Bounce.easeOut });
            }

            this.$app.breadcrumbs.pop();
            this._fixStyle();
        },

        onTopMenu(menu, isSelected) {
            const $modeSelector = $('#mode-selector');
            const modeName = menu.name.toLowerCase();
            const $modeSelected = $modeSelector.find('.mode-' + modeName);

            if(isSelected || $modeSelector.is(':visible')) {
                if(isSelected) {
                    _this.reset(menu);
                    $$$.router.push({name:modeName});

                    trace($$$.router.currentRoute);

                    $$$.fx.fadeIn('#master', true);
                }
                return $$$.fx.fadeOut('#mode-selector');
            }

            $$$.fx.fadeIn($modeSelector);
        },

		login() {
        	$$$.panelManager.push('user-login');

//        	const panel = $('#user-panel');
//        	trace(panel);
//
//			$.post('./auth')
//				.then( loginData => {
//					trace("LOGIN DATA is:");
//					trace(loginData);
//				})
//				.catch( err => {
//					trace("Error");
//				})
		}
    },

    mounted() {
        _this = this;

        this.$lookup('menu', this);

        false && setTimeout(() => {
        	this.login();
        }, 500)
    }
};
</script>