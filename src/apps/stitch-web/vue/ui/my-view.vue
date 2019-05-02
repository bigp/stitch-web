<template>
    <div v-if="isRouteMatching">
        <slot></slot>
    </div>
</template>

<script>
	export default {
		props: [],

		computed: {
            isRouteMatching() {
            	const name = this.$parent.$options._componentTag;
            	const path = this.$route.path;
            	return path.has(name);
            }
		}
	}
</script>