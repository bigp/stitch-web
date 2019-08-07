<template>
    <div>
        <i class="header-container">
            <i class="heading noclick">- {{title}} -</i>
            <btn icon="close" color="#d00" @click="$app.popupMan.dismissPopup()"></btn>
        </i>
        <div class="content">
            <slot></slot>
        </div>
        <div class="button-bar">
            <slot name="button-bar"></slot>
        </div>
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
            const popupObj = this.$app.popupMan.popups.last();
            popupObj.$vue = this.childComponent;
            this.childComponent.$popup = popupObj;
        },

        updated() {
            $$$.app.popupMan.centerPopups();
        }
    }

</script>