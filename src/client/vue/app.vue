<template>
    <div class="app fullsize">
        <smart-button test="bla bla bla"></smart-button>
    </div>
</template>
<script>


	export default {
		data() {
			return {
				title: 'Hello World',
			}
        },

        watch: {
			'$route'() {
//				this.$lookup('menu').init();
//
//				_.defer(() => this.$forceUpdate());
            }
        },

        computed: {

        },

        methods: {

		},

        mounted() {

        }
    }


</script>