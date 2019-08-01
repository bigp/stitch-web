<template>
    <popup title="Project Selector">
        <div class="padded">
            <!-- ?????????? -->
        </div>

        <template #button-bar>
            <btn @click="onConfirm()"
                icon="check"
                color="#080">Confirm</btn>
        </template>
    </popup>
        
</template>

<script>
export default {
    props: [],

    data() {
        return {
            
        }
    },
    
    computed: {
        ...Vuex.mapGetters('projectData driveLetters treeData'),

        isPathDeepEnough() {
            const treeData = this.treeData;
            if(!treeData || !treeData.data) return false;
            return _.count(treeData.data, '/') > 1;
        },

        trimmedFullPath() {
            const treeData = this.treeData;
            if(!treeData || !treeData.data) return '';
            return treeData.data.before('/', false, true).before('/', false, true);
        },

        isCurrentFavorite() {
            if(!this.projectData || !this.projectData.favoritePaths) return false;
            
            return this.projectData.favoritePaths.has(this.treeData.data);
        },

        isAllChecked() {
            const kids = this.treeData && this.treeData.children ? this.treeData.children : [];
            if(!kids.length) return false;

            const uncheckedItem = kids.find( item => !item.isChecked );
            return uncheckedItem == null;
        }
    },

    methods: {
        //...Vuex.mapActions("sendBrowsePath addFavorite removeFavorite"),
    },
    
    mounted() {
        
    }
}
</script>
