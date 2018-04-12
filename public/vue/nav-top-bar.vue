<template>
    <div id="top-bar">
        <ul class="breadcrumb pointer">
            <li v-for="(menu, i) in $app.menus"
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
            <icon name="question-circle"></icon>
            <icon name="bug"></icon>
        </ul>
    </div>
</template>

<script>
    var _this;
	const CRUMB_0 = '.breadcrumb .cr-0';

	$(document).keydown( e => {
		switch(e.key) {
			case ' ': _this.pushMenu(_this.topmenus[1]); break;
			case 'Backspace': _this.popMenu(); break;
		}
	});

	export default {
		data() {
			return {
				homeMenu: {name: 'Home', cb:this.onTopMenu, color: '#456', icon: 'home', desc: 'Home Screen'},
				topmenus: [
					{name: 'Project',  cb:this.onTopMenu, color: '#f80', icon: 'star', desc: 'Create and Manage your projects and clients.'},
					{name: 'Designer', cb:this.onTopMenu, color: '#c08', icon: 'object-group', desc: 'Draw and Import assets into a project.'},
					{name: 'Animator', cb:this.onTopMenu, color: '#0c8', icon: 'play-circle', desc: 'Bring your assets to life in a timeline interface.'},
					{name: 'Invoices', cb:this.onTopMenu, color: '#08f', icon: 'file', desc: 'Bill your clients and get paid!'},
				],
			}
        },

        computed: {

        },

        methods: {
            _fixStyle() {
            	const _this = this;
            	if(_this._isFixing) return;

				_.defer(function() {
					$(CRUMB_0).setClassIf('cr-single', _this.$app.menus.length===1);
					_this._isFixing = false;
                });
            },

			init() {
				const routeName = this.$app.getRouteName();
				const first = this.topmenus.find(m => m.name.toLowerCase()===routeName);
				this.reset(first);
			},

			reset(menus) {
				this.$app.menus = _.castArray(menus || []);
				this._fixStyle();
			},

			pushMenu(menu) {
				this.$app.menus.push(menu);
				this._fixStyle();
			},

			popMenu() {
				if(this.$app.menus.length===1) {
					return TweenMax.fromTo(
						CRUMB_0,
						0.5,
						{css: {color:'#f00'}},
						{css: {color:'#fff'}, ease: Bounce.easeOut });
				}

				this.$app.menus.pop();
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
			}
        },

        mounted() {
			_this = this;

			this.$lookup('menu', this);
        }
	};
</script>