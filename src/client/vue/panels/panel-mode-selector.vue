<template>
    <panel id="mode-selector" ref="panel" header="Pick a Mode">
        <goto v-for="(menu, i) in $app.topmenus" :key="menu.name"
              class="box pointer"
              :to="{name: menu.name.toLowerCase()}"
              :class="getCSS(menu)"
              :style="$app.getMenuCSS(menu)"
              @click="$refs.panel.fadeOut(true)">

            <div class="table">
                <i class="menu-name"><icon :name="menu.icon"></icon>{{menu.name}} -</i>
                <i class="menu-desc">{{menu.desc}}</i>
            </div>
        </goto>
    </panel>
</template>

<script>

export default {
	methods: {
		getCSS(menu) {
			var lowcase = menu.name.toLowerCase();
			return [
				'mode-' + lowcase,
				{selected: lowcase === this.$app.getRouteName()}
			];
		}
	}
}


</script>