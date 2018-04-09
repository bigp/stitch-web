import topmenus from '../data/db-topmenus';

/**
 * Created by Chamberlain on 4/6/2018.
 */
export default function SELF(config) {
	SELF.reset(SELF.topmenus[0]);
}

$(document).keydown( e => {
	switch(e.key) {
		case ' ': SELF.pushMenu(SELF.topmenus[1]); break;
		case 'Backspace': SELF.popMenu(); break;
	}
});

_.extend(SELF, {
	topmenus: topmenus,

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
			return TweenMax.fromTo('.breadcrumb .cr-0', 0.5, {css: {color:'#f00'}}, {css: {color:'#fff'}, ease:Bounce.easeOut});
		}

		$$$.vue.menus.pop();
		SELF._fixStyle();
	},

	_fixStyle: $$$.deferOnce(() => {
		const crumb = $('.breadcrumb .cr-0');
		if($$$.vue.menus.length===1) {
			crumb.addClass('cr-single');
		} else {
			crumb.removeClass('cr-single');
		}
	})
});