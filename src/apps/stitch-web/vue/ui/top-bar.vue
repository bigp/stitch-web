<template>
    <nobr>
        <i class="inner">
            <h1 class="my-title">{{title}}</h1>
            <btn v-for="(menu, k) in $app.menus"
                @mousedown="gotoMenu(menu)"
                :key="k"
                :color="menu.color"
                :icon="menu.icon">{{menu.name}}</btn>
        </i>
    </nobr>
</template>

<script>
    
	export default {
		props: ['title'],

        computed: {
			
        },

        methods: {
            gotoMenu(btn) {
				this.$router.push(btn.name.toLowerCase());
            }
        },

        created() {
			const current = this.$router.history.current;
			if(current.path=='/') {
				this.gotoMenu(this.$app.menus[0]);
            }
        }
	}
</script>