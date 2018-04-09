export default function SELF(config) {
    $$$.vue = new Vue({
		el: '#app',
		data: data,
        methods: methods,
        computed: computed, 
	});
}

const data = {
    helpers: {
        lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
	},
    title: 'Hello World',
	menus: [
		{name: 'EFNS', cb: 'test'},
	],
    current: {
        menu: 0,
    }
}

const computed = {
    // menuTitle() {
    //     return this.current && !isNaN(this.current.menu) ? this.topmenus[this.current.menu].name : 'None';
    // }
}

const methods = {
    onMenuClick(menu) {
        if(!menu.cb) return trace("No click callback for menu: " + menu.name);

        menu.cb(menu);
    },

	getMenuCSS(menu) {
        var color = menu.color || '#88f';
        var colorHover = tinycolor(color).brighten(25).toHexString();
        return `--crumbColor: ${color}; --crumbColorHover: ${colorHover};`;
    }
}
