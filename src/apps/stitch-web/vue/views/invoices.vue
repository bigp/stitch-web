<template>
    <my-view>
        <portal to="extra-buttons">
            <btn icon="search 1" @click="$global.alert('Find Invoice')">Find Invoice</btn>
            <btn icon="search 2" @click="$global.alert('test b')">B</btn>
            <btn icon="search 3" @click="$global.alert('test c')">C</btn>
        </portal>

        <i>HI THERE! Invoices....</i>
    </my-view>
</template>

<script>
	export default {
		props: [],

		computed: {

		},

		methods: {

		},
	}
</script>