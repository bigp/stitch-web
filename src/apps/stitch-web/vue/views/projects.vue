<template>
    <my-view>
        <div class="padded">
            <btn icon="folder-open"
                @mousedown="onOpenProject">Open Project ...</btn>

            <btn v-for="(letter, key) in driveLetters"
                :key="key"
                icon="hdd"
                solid="1"
                @click="onSelectedDriveLetter(letter)"
                class="drive-letter">{{letter}}:</btn>

            <!-- <input v-show="isShowingPath"
                   type="text"
                   class="open-project"
                   placeholder="[paste path here]"
                   v-model="pathToOpen"
                   @keydown.enter="onEnterPressed" /> -->
        </div>

        <tree-item :item="treeData" />
    </my-view>
</template>

<script>
	export default {
		props: [],
        data() {
			return {
				isShowingPath: false,
                pathToOpen: '',
                driveLetters: [],
                treeData: {
                    name: 'test',
                    children: [
                        {name: 'hello'},
                        {name: 'world'}
                    ]
                }
			}
        },

		computed: {

		},

		methods: {
			onOpenProject() {
				this.isShowingPath = !this.isShowingPath;
            },
        
			onProjectFolderSelected(e) {
				trace(e.target.files);
            },

			// onEnterPressed(e) {
			// 	trace(this.pathToOpen);

			// 	$.ajax({
            //         type: 'POST',
            //         url:'/api/open-project',
            //         success(res) {
            //         	trace(res);
            //         },
            //         fail(err) {
            //         	trace(err);
            //         }
			// 	})
            // },

            addItem(item) {
                item.children.push({
                    name: 'new item #' + (item.children.length + 1),
                    children:[],
                });
            },

            onSelectedDriveLetter(letter) {
                trace(letter);
            }
        },
        
        mounted() {
            $$$.api('projects/drive-letters')
                .then( data => this.driveLetters = data.driveLetters )
                .catch( err => trace(err) );
        }
	}
</script>