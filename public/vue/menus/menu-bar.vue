<template>
    <ul class="pointer menu-bar">
        <menu-item v-for="(menuItem, i) in source"
                   :item="menuItem"
                   :key="i"
        ></menu-item>
    </ul>
</template>

<script>

export default {
	props: ['source'],

	computed: {

    },

    methods: {

    }
}

</script>