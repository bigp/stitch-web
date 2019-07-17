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
		props: ['title', 'menus'],

        computed: {
			
        },

        methods: {
            gotoMenu(btn) {
                const menus = this.menus;
                if(_.isNumber(btn)) btn = menus && menus.length>0 ? menus[btn] : null;
                if(!btn || !menus || !menus.length) return;

				this.$router.push(btn.name.toLowerCase());
            }
        },

        created() {
			const current = this.$router.history.current;
			if(current.path=='/') {
				this.gotoMenu(0);
            }
        }
	}
</script>