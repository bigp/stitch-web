<template>
    <popup title="File Browser">
        <header-list title="Favorites:" icon="star"
            @item-click="onClickFavorite"
            :headerCondition="isPathDeepEnough"
            :itemSelector="(value) => treeData.data == value"
            :itemRenderer="(value) => shortPath(value)"
            :items="favoritePaths">

            <btn @click="onAddFavorite()"
                icon="plus"
                color="#ea2"
                v-show="!isCurrentFavorite"></btn>

            <btn @click="onRemoveFavorite()"
                icon="trash"
                color="#e20"
                v-show="isCurrentFavorite"></btn>

        </header-list>

        <header-list title="Select:" icon="check-square"
            @item-click="onClickFavorite"
            :itemSelector="(value) => treeData.data == value"
            :itemRenderer="(value) => shortPath(value)"
            :items="[]">

            <btn @click="onSelectAll()"
                icon="check-square"
                color="#24e">All</btn>

            <btn @click="onSelectNone()"
                icon="square"
                color="#24e">None</btn>
        </header-list>

        <div class="inline-block padded">
            <btn @click="onPathClicked(trimmedFullPath)"
            icon="arrow-up">Up</btn>

            <btn v-for="(letter, key) in driveLetters"
                @click="onSelectedDriveLetter(letter)"
                :key="key"
                icon="hdd"
                solid="1"
                class="drive-letter">{{letter}}:</btn>
        </div>

        

             <!----------------------------------->

        <tree-item class="file-explorer"
            :item="treeData"
            :isSelectable="isPathDeepEnough"
            @item-click="onPathClicked">
        </tree-item>
        

        <template #button-bar>
            <btn @click="$app.popupMan.dismissPopup(selectedPaths)"
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
        ...Vuex.mapGetters('*'),

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
            if(!this.favoritePaths) return false;
            
            return this.favoritePaths.has(this.treeData.data);
        },

        isAllChecked() {
            const kids = this.treeData && this.treeData.children ? this.treeData.children : [];
            if(!kids.length) return false;

            const uncheckedItem = kids.find( item => !item.isChecked );
            return uncheckedItem == null;
        },

        selectedPaths() {
            return this.treeData.children.filter(f => f.isChecked);
        }
    },

    methods: {
        ...Vuex.mapActions("*"),

        onSelectedDriveLetter(letter) {
            const treeData = this.treeData || {};
            if(treeData.data && treeData.data.startsWith(letter)) return;

            this.sendBrowsePath({path: letter + ":/"});
        },

        onPathClicked(item) {
            const path = (_.isString(item) ? item : item.data).mustEndWith('/');
            
            if(path==this.treeData.data) return;

            this.sendBrowsePath({path: path});
        },

        onError(err, item) {
            if(err && err.responseText) {
                trace(err.responseText);
            }

            item.isError = true;

            this.$forceUpdate();
        },

        onAddFavorite() {
            const item = this.treeData;

            this.addFavorite( item.path ).catch( err => this.onError(err, item) );
        },

        onRemoveFavorite() {
            const item = this.treeData;

            this.removeFavorite( item.path ).catch( err => this.onError(err, item) );
        },

        shortPath(fav) {
            return _.trim(fav, '/').split('/').pop();
        },

        forAllItems(cb) {
            this.treeData.children.forEach(cb);
        },

        onClickFavorite(fav) {
            this.onPathClicked(fav);
        },

        onSelectAll() {
            this.forAllItems(i => i.isChecked = true);
        },

        onSelectNone() {
            this.forAllItems(i => i.isChecked = false);
        },

        initializeTreeView() {
            if(this.isFirstLoad) {
                trace.WARN("Still loading...");
                return;
            }
            const favs = this.favoritePaths;
            
            if(!favs || !favs.length) {
                trace.INFO('No favs, trying the 1st drive-letter...');
                if(!this.driveLetters || !this.driveLetters.length) {
                    trace.WARN("driveLetters empty / not ready!");
                } else {
                    trace.OK('Trying with drive-letter: ' + this.driveLetters[0]);
                    this.onPathClicked(this.driveLetters[0] + ':');
                }
                return;
            }

            this.onPathClicked(favs[0]);
        }
    },

    watch: {
        'driveLetters'(current, prev) {
            this.initializeTreeView();
        }
    },
    
    mounted() {
        this.initializeTreeView();
    }
}
</script>
