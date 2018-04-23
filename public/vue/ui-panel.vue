<template>
    <div class="fullsize">
        <div class="modal-fader fullsize"></div>

        <div class="panel box-shadow is-centered">
            <slot></slot>
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

		methods: {
			fadeOut(isForced) {
				$$$.fx.fadeOut(this.$el, () => {
					$$$.panelManager.pop();
                });
				isForced && this.$forceUpdate();
			},
		},

		mounted() {
			$$$.fx.fadeIn(this.$el, true);
            $$$.emit('dom-changed');

			$(this.$el).find('.modal-fader').click(() => {
				this.fadeOut();
			});

			$(window).keydown(e => {
				if (!this.isVisible) return;
				this.fadeOut();
			})
		}
	}


</script>