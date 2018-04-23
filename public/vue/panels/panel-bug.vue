<template>
    <panel id="bug-report" header="Bug Report" subclasses="debug">
        <field name="firstName" label="First Name" value="First Name"></field>
        <textarea id="" placeholder="Enter your bug here..."></textarea>
    </panel>
</template>

<script>

	export default {
		methods: {
			send() {
				trace("Sending bug report");
            }
		}
	}

</script>