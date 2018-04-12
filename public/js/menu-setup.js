/**
 * Created by Chamberlain on 4/6/2018.
 */
export default function SELF(config) {
	return SELF;
}

$(document).keydown( e => {
	switch(e.key) {
		case ' ': SELF.pushMenu(SELF.topmenus[1]); break;
		case 'Backspace': SELF.popMenu(); break;
	}
});

const homeMenu = {name: 'Home', cb:onTopMenu, color: '#456', icon: 'home', desc: 'Home Screen'};

function topmenus() {
	return [
		{name: 'Project',  cb:onTopMenu, color: '#f80', icon: 'star', desc: 'Create and Manage your projects and clients.'},
		{name: 'Designer', cb:onTopMenu, color: '#c08', icon: 'object-group', desc: 'Draw and Import assets into a project.'},
		{name: 'Animator', cb:onTopMenu, color: '#0c8', icon: 'play-circle', desc: 'Bring your assets to life in a timeline interface.'},
		{name: 'Invoices', cb:onTopMenu, color: '#08f', icon: 'file', desc: 'Bill your clients and get paid!'},
	];
}

function onTopMenu(menu, isSelected) {
	const $modeSelector = $('#mode-selector');
	const modeName = menu.name.toLowerCase();
	const $modeSelected = $modeSelector.find('.mode-' + modeName);

	$modeSelector.findAndRemove('.selected');

	if(isSelected || $modeSelector.is(':visible')) {
		if(isSelected) {
			$modeSelected.addClass('selected');
			$$$.menu.reset(menu);
			$$$.router.push({name:modeName});

			trace($$$.router.currentRoute);

			$$$.fx.fadeIn('#master', true);
		}
		return $$$.fx.fadeOut('#mode-selector');
	}

	$$$.fx.fadeIn($modeSelector);

	$modeSelected.addClass('selected');
}

const CRUMB_0 = '.breadcrumb .cr-0';

_.extend(SELF, {
	topmenus: topmenus(),
	homeMenu: homeMenu,
	onTopMenu: onTopMenu,

	init() {
		const routeName = $$$.getRouteName();
		const first = SELF.topmenus.find(m => m.name.toLowerCase()===routeName);
		SELF.reset(first);
	},

	reset(menus) {
		$$$.vue.menus = _.castArray(menus || []);
		SELF._fixStyle();
	},

	pushMenu(menu) {
		$$$.vue.menus.push(menu);
		SELF._fixStyle();
	},

	popMenu() {
		if($$$.vue.menus.length===1) {
			return TweenMax.fromTo(
				CRUMB_0,
				0.5,
				{css: {color:'#f00'}},
				{css: {color:'#fff'}, ease: Bounce.easeOut });
		}

		$$$.vue.menus.pop();
		SELF._fixStyle();
	},

	_fixStyle: $$$.deferOnce(() => {
		$(CRUMB_0).setClassIf('cr-single', $$$.vue.menus.length===1);
	})
});