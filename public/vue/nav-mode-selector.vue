<template>
    <div id="mode-selector" class="fader fullsize init-hidden">
        <div class="panel box-shadow is-centered">
            <goto v-for="(mode, i) in modes" :key="mode.name"
                 class="box pointer"
                  @click="onModeSelected(mode)"
                 :to="{name: mode.name.toLowerCase()}"
                  :class="['mode-' + mode.name.toLowerCase(), {selected: mode.name.toLowerCase()===$app.getRouteName()}]"
                  :style="$app.getMenuCSS(mode)">

                <i class="menu-name"><icon :name="mode.icon"></icon>{{mode.name}}</i>
                <i class="menu-desc">{{mode.desc}}</i>
            </goto>
        </div>
    </div>
</template>

<script>

var $modeSelector;

export default {
	computed: {
		modes() {
			const menu = this.$lookup('menu');
			trace('menu...');
			trace(menu);
			if(!menu) return [];

			return menu.topmenus;
        }
    },

	methods: {
		onModeSelected(mode) {
			mode.cb(mode);
		}
    },

    mounted() {
    	$modeSelector = $('#mode-selector');
    }
}

</script>