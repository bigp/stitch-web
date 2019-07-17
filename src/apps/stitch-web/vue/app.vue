<template>
    <div>
        <top-bar title="Stitch-Web" :menus="menus"></top-bar>

        <div class="main">
            <component :is="value.name.toLowerCase()" :key="key" v-for="(value, key) in menus" />
        </div>
        
        <div class="popups fullsize">
            <div class="modal-shadow fullsize" v-if="hasPopups"></div>
        </div>
    </div>
</template>

<script>
    import * as ui from './ui/*';
    import * as views from './views/*';

    const menus = [
		{name:'Projects', icon:'flag', color: '#2a3'},
        //{name:'Invoices', icon:'file', color: '#06f'},
        //{name:'Animations', icon:'image', color: '#42d'},
		//{name:'Settings', icon:'cog', color: '#f00'},
	];

	export default {
        components: _.extend( {}, ui, views ),

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
            main() {
                trace("App.vue: methods.main() !!!");
            }
		},

        mounted() {
            trace("??????");
        },
    }
</script>