<template>
    <div id="mode-selector" class="fullsize init-hidden">
        <div class="fader fullsize"></div>
        <div class="panel box-shadow is-centered">
            <goto v-for="(menu, i) in $app.topmenus" :key="menu.name"
                 class="box pointer"
                  @click="onModeSelected(menu)"
                 :to="{name: menu.name.toLowerCase()}"
                  :class="getCSS(menu)"
                  :style="$app.getMenuCSS(menu)">

                <div class="table">
                    <i class="menu-name"><icon :name="menu.icon"></icon>{{menu.name}} -</i>
                    <i class="menu-desc">{{menu.desc}}</i>
                </div>
            </goto>
        </div>
    </div>
</template>

<script>

export default {
	data() {
		return {
			isVisible: false
		}
	},

	computed: {},

	methods: {
		fadeOut(isForced) {
			$$$.fx.fadeOut(this.$el);
			isForced && this.$forceUpdate();
		},

		getCSS(menu) {
			var lowcase = menu.name.toLowerCase();
			return [
				'mode-' + lowcase,
				{selected: lowcase === this.$app.getRouteName()}
			];
		},

		onModeSelected(menu) {
			this.fadeOut(true);
		}
	},

	mounted() {
		var _this = this;

		$(this.$el).find('.fader').click(() => {
			_this.fadeOut();
		});

		$(window).keydown(e => {
			if (!_this.isVisible) return;
			_this.fadeOut();
		})
	}
}


</script>