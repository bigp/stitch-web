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
            <icon name="user" id="user-icon" v-open-panel="'login'"></icon>
            <icon name="cog" v-open-panel="'settings'"></icon>
            <icon name="question-circle" v-open-panel="'help'"></icon>
            <icon name="bug" v-open-panel="'bug'"></icon>
        </ul>
    </div>
</template>

<script>

let _this;
const CRUMB_FIRST = '.breadcrumb .cr-0';

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
                $(CRUMB_FIRST).setClassIf('cr-single', _this.$app.breadcrumbs.length===1);
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
                return $$$.fx.flashColor(CRUMB_FIRST, '#f00', '#fff');
            }

            this.$app.breadcrumbs.pop();
            this._fixStyle();
        }
    },

    mounted() {
        _this = this;

        this.$lookup('menu', this);

		$$$.PLEASE_TEST
            .settings(this)
            .login(this)
            .help(this)
            .bug(this);
    }
};
</script>