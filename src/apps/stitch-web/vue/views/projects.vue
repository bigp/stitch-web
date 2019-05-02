<template>
    <my-view>
        <div class="padded">
            <btn icon="folder-open" @mousedown="openProject">Open Project ...</btn>
            <input v-show="isShowingPath"
                   type="text"
                   class="open-project"
                   placeholder="[paste path here]"
                   v-model="pathToOpen"
                   @keydown.enter="onEnter" />

        </div>

        <div class="padded">
            <h3>Recent Projects:</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>

    </my-view>
</template>

<script>
	export default {
		props: [],
        data() {
			return {
				isShowingPath: false,
				pathToOpen: '',
			}
        },

		computed: {

		},

		methods: {
			openProject() {
				this.isShowingPath = !this.isShowingPath;
            },

			onProjectFolderSelected(e) {
				trace(e.target.files);
            },

			onEnter(e) {
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
            }
		},
	}
</script>