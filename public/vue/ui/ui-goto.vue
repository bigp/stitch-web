<template>
    <a class="smart-link" href="javascript:;" @mousedown="doClick">
        <slot></slot>
    </a>
</template>

<script>
    export default {
		props: ['to'],
		methods: {
			doClick(e) {
				this.$app.gotoRoute(this.to);
				this.$emit('click', e);
			}
		}
	}
</script>