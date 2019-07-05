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
            <div class="modal-shadow fullsize" v-if="hasPopups"></div>
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
            hasPopups() {
                return this.popups.length > 0;
            }
        },

        methods: {

		},

        mounted() {

        },
    }
</script>