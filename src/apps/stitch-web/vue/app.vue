<template>
    <div>
        <top-bar title="|"></top-bar>

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
    const menus = [
		{name:'Projects', icon:'flag', color: '#2a3'},
        {name:'Invoices', icon:'file', color: '#06f'},
        {name:'Animations', icon:'image', color: '#42d'},
		{name:'Settings', icon:'cog', color: '#f00'},
	];

	export default {
		data() {
			return {
                popups: [],
                menus: menus,
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