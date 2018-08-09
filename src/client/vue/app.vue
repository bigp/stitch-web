<template>
    <div>
        <top-bar></top-bar>
        <div class="main">
            <projects></projects>
            <invoices></invoices>
            <animations></animations>
            <settings></settings>
        </div>
        <div class="popups fullsize">
            <div class="modal-shadow fullsize" v-if="popups.length > 0"></div>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				popups: [],
			}
        },

        watch: {
			'$route'() {
                //_.defer(() => this.$forceUpdate());
            }
        },

        computed: {

        },

        methods: {

		},

        mounted() {

        },
    }
</script>