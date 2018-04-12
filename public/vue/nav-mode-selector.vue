<template>
    <div id="mode-selector" class="fader fullsize init-hidden">
        <div class="panel box-shadow is-centered">
            <goto v-for="(menu, i) in $app.topmenus" :key="menu.name"
                 class="box pointer"
                  @click="onModeSelected(menu)"
                 :to="{name: menu.name.toLowerCase()}"
                  :class="getCSS(menu)"
                  :style="$app.getMenuCSS(menu)">

                <i class="menu-name"><icon :name="menu.icon"></icon>{{menu.name}}</i>
                <i class="menu-desc">{{menu.desc}}</i>
            </goto>
        </div>
    </div>
</template>

<script>

export default {
	computed: {

    },

	methods: {
		getCSS(menu) {
			var lowcase = menu.name.toLowerCase();
			return [
				'mode-' + lowcase,
                {selected: lowcase===this.$app.getRouteName()}
            ];
        },

		onModeSelected(menu) {
			$$$.fx.fadeOut('#mode-selector');
			this.$forceUpdate();
		}
    }
}

</script>