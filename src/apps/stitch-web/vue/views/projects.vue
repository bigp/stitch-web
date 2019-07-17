<template>
    <my-view>
        <div class="padded">
            <btn icon="folder-open" @mousedown="onOpenProject">Open Project ...</btn>
            
            <input v-show="isShowingPath"
                   type="text"
                   class="open-project"
                   placeholder="[paste path here]"
                   v-model="pathToOpen"
                   @keydown.enter="onEnterPressed" />
        </div>

        <!-- <div class="padded">
            <h3>Recent Projects:</h3>
            <ul>
                <li>1</li>
            </ul>
        </div> -->

        <ul>
            <tree-item :item="treeData"></tree-item>
        </ul>
    </my-view>
</template>

<script>
	export default {
		props: [],
        data() {
			return {
				isShowingPath: false,
                pathToOpen: '',
                treeData: {
                    name: 'test',
                    children: [
                        {name: 'hello'},
                        {name: 'world'},
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

			onEnterPressed(e) {
				trace(this.pathToOpen);

				$.ajax({
                    type: 'POST',
                    url:'/api/open-project',
                    success(res) {
                    	trace(res);
                    },
                    fail(err) {
                    	trace(err);
                    }
				})
            },

            addItem(item) {
                item.children.push({
                    name: 'new item #' + (item.children.length + 1),
                    children:[],
                });
            }
		},
	}
</script>