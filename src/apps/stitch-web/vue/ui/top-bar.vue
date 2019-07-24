<template>
    <div>
        <h1 class="my-title">
            <icon v-if="icon" :name="icon"></icon>
            {{title}}
        </h1>
        <div class="menu-buttons">
            <btn v-for="(menu, k) in menus"
                @mousedown="gotoMenu(menu)"
                :key="k"
                :color="menu.color"
                :icon="menu.icon">{{menu.name}}</btn>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    
	export default {
		props: ['title', 'menus', 'icon'],

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