<template>
    <div class="top-bar">
        <ul class="breadcrumb pointer">
            <li v-for="(menu, i) in $app.breadcrumbs"
                :class="'crumb cr-' + i"
                :style="$app.getMenuCSS(menu)"
                @click='$app.onMenuClick(menu)'>
                <icon :name="menu.icon"></icon>
                <i>{{menu.name}}</i>
            </li>
        </ul>

        <menu-bar :source="$app.topmenu.menus"></menu-bar>

        <ul id="right-bar" class="pointer">
            <icon name="user" id="user-icon" v-open-panel="'login'"></icon>
            <icon name="cog" v-open-panel="'settings'"></icon>
            <icon name="question-circle" v-open-panel="'help'"></icon>
            <icon name="bug" v-open-panel="'bug'"></icon>
        </ul>
    </div>
</template>

<script>
const CRUMB_FIRST = '.breadcrumb .cr-0';

export default {
    computed: {

    },

    methods: {
        _fixStyle() {
            if(this._isFixing) return;
			this._isFixing = true;

            _.defer(() => {
                $(CRUMB_FIRST).setClassIf('cr-single', this.$app.breadcrumbs.length===1);
                this._isFixing = false;
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
        this.$lookup('menu', this);

		$$$.PLEASE_TEST
            .settings(this)
            .login(this)
            .help(this)
            .bug(this);

		const onKey = e => {
			switch(e.key) {
				case ' ': this.pushMenu(this.$app.topmenus[1]); break;
				case 'Backspace': this.popMenu(); break;
			}
		};

		$(document).keydown( onKey );

		this.$once('hook:destroyed', () => {
			$$$.off(EVENT_COLLAPSE_ALL, closeFunc);
		});
    }
};
</script>