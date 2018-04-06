export default function(config) {
    $$$.vue = new Vue({
		el: '#app',
		data: data,
        methods: methods,
        computed: computed, 
	});
}

const data = {
    lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    title: 'Hello World',
    topmenus: [
        {name: 'Project', color: '#f00'},
        {name: 'Designer', color: '#f00'},
        {name: 'Animator', color: '#f00'},
        {name: 'Invoices', color: '#f00'},
    ],
    current: {
        menu: 0,
        menus: [
            {name: 'EFNS', cb: 'test'},
            {name: 'Mercury Register', cb: 'test'},
            {name: 'en_300x250_1234-01_Campaign_c01<br/>50KB', cb: 'test'},
        ],
    }
}

const computed = {
    menuTitle() {
        return this.current && !isNaN(this.current.menu) ? this.topmenus[this.current.menu].name : 'None';
    }
}

const methods = {
    onMenuClick() {
        trace("MENU CLICK!");
    }
}
