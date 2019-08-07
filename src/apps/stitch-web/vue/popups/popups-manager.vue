<template>
    <div class="fullsize abs top-left" v-if="hasPopups">
        <!------------ FULLSIZE CONTAINER (for popups, modals, etc.) ---------------->
    
        <div class="popups modal-shadow top-left fullsize"></div>
        <component v-for="(popup, i) in popups" :key="i" :is="popup.name" class="popup">
        </component>

        <b-modal id="prompt-master"
            @ok="onPromptDismissed"
            @cancel="onPromptDismissed"
            @close="onPromptDismissed">
            <template #modal-title>
                <i v-html="promptData.title"></i>
            </template>
            <div>{{promptData.message}}</div>
            <input type="text" v-model="promptData.answer" class="fullwidth" />
        </b-modal>
    </div>    
</template>

<script>

export default {
    data() {
        return {
            popups: [],
            promptData: {answer: null},
        }
    },

    computed: {
        hasPopups() {
            return this.popups.length > 0;
        }
    },

    methods: {
        add(popup, cb) {
            if(cb) popup.cb = cb;

            this.popups.push( popup );

            requestAnimationFrame(() => {
                this.centerPopups();
                TweenMax.from('.popup, .modal-shadow', 0.3, {alpha:0});
            });
        },

        dismissPopup(answer) {
            var popup = this.popups.pop();
            if(!popup) return;

            popup.cb && popup.cb( answer );
        },

        centerPopups() {
            $('.popup').center();
        },

        prompt(opts) {
            if(_.isString(opts)) opts = {message: opts};

            const data = this.promptData = _.defaults(opts, {title: 'Prompt', answer:null});

            data.promise = new Promise((_then, _catch) => {
                data._then = _then;
                data._catch = _catch;

                this.$bvModal.show('prompt-master');
            });

            return data.promise;
        },

        onPromptDismissed(e) {
            const data = this.promptData;
            const answer = e.trigger=='ok' ? data.answer : null;
            data._then(answer);

            this.promptData = {};
            //this.promptData.cb && this.promptData.cb(answer);
        }
    },

    mounted() {
        $$$.onLater( $$$.EVENTS.STYLE_CHANGED, -2, this.centerPopups);
    }
}

</script>
