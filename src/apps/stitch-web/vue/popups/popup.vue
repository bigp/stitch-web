<template>
    <div>
        <i class="block rel">
            <i class="inline-block abs bold top-left center fullsize heading noclick">- {{title}} -</i>
            <i class="inline-block fullsize right">
                <btn icon="close" @click="$app.dismissPopup()"></btn>
            </i>
        </i>
        <slot></slot>
    </div>
</template>

<script>
	export default {
        props: ['title'],
		
        data() {
			return {
				
			}
        },

		computed: {
            childComponent() {
                return this.$slots.default[0].context;
            }
		},

		methods: {
			
        },
        
        mounted() {
            //Create *CIRCULAR-REFERENCE* between the popup-object and the Vue popup child component:
            const popupObj = this.$app.popups.last();
            popupObj.$vue = this.childComponent;
            this.childComponent.$popup = popupObj;

            if(popupObj.data) {
                _.forOwn(popupObj.data, (value, key) => {
                    this.childComponent[key] = value;
                })
            }
        }
    }

</script>