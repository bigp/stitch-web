<template>
    <panel id="help" header="Help">
        <field name="firstName" label="First Name" value="First Name"></field>
    </panel>
</template>

<script>

	export default {
		methods: {
			send() {
				trace("Get Tech Support!");
			}
		}
	}

</script>