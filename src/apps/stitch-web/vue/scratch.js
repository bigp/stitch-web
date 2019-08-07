export default {
    data() {
        return {
            //some data here...
        }
    },
    
    computed: {
        ...Vuex.mapGetters( '*' ),
        // Other computed properties here...
    },

    methods: {
        ...Vuex.mapActions( '*' ),
        // Other methods here...
    }
}
