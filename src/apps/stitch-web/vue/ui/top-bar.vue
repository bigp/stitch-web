<template>
    <nobr>
        <i class="inner">
        <my-title>Stitch-Web</my-title>
        <btn v-for="(btn, k) in menuButtons"
             @mousedown="onMenuClick(btn)"
             :color="btn.color"
             :icon="btn.icon">{{btn.name}}</btn>
        </i>
    </nobr>
</template>

<script>
    const menus = [
		{name:'Projects', icon:'flag', color: '#2a3'},
        {name:'Invoices', icon:'file', color: '#06f'},
        {name:'Animations', icon:'image', color: '#42d'},
		{name:'Settings', icon:'cog', color: '#f00'},
	];

	export default {
		props: ['test'],

        computed: {
			menuButtons() {
				return menus;
            }
        },

        methods: {
			onMenuClick(btn) {
				this.gotoMenu(btn);
            },

            gotoMenu(btn) {
				this.$router.push(btn.name.toLowerCase());
            }
        },

        created() {
			const current = this.$router.history.current;
			if(current.path=='/') {
				this.gotoMenu(menus[0]);
            }
        }
	}
</script>