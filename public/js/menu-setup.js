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

const CRUMB_0 = '.breadcrumb .cr-0';

_.extend(SELF, {
	topmenus: topmenus(),

	init() {
		const routeName = $$$.router.currentRoute.path.split('/')[1];
		const first = SELF.topmenus.find(m => m.name.toLowerCase()===routeName);
		SELF.reset(first);

		//first.cb(first, true);
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

function topmenus() {
	return [
		{name: 'Project',  cb:onTopMenu, color: '#f80', icon: 'star', desc: 'Create and Manage your projects and clients.'},
		{name: 'Designer', cb:onTopMenu, color: '#c08', icon: 'object-group', desc: 'Draw and Import assets into a project.'},
		{name: 'Animator', cb:onTopMenu, color: '#0c8', icon: 'play-circle', desc: 'Bring your assets to life in a timeline interface.'},
		{name: 'Invoices', cb:onTopMenu, color: '#08f', icon: 'file', desc: 'Bill your clients and get paid!'},
	];
}

function onTopMenu(e, isSelected) {
	const modeName = e.name.toLowerCase();
	const modeSelected = $('#mode-selector').find('.mode-' + modeName);

	$('#mode-selector .selected').removeClass('selected');


	if(isSelected || $('#mode-selector').is(':visible')) {
		if(isSelected) {
			modeSelected.addClass('selected');
			$$$.menu.reset(e);
			$$$.router.push(modeName);
		}
		return $$$.fx.fadeOut('#mode-selector');
	}

	$$$.fx.fadeIn('#mode-selector');

	modeSelected.addClass('selected');
}