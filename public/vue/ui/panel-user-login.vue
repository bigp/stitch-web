<template>
    <panel id="user-login">
        <center>
        <h3>User Login</h3>
        <field name="firstName" label="First Name" value="First Name"></field>
        <field name="firstName" label="First Name" value="First Name"></field>
        <field name="firstName" label="First Name" value="First Name"></field>
        </center>
    </panel>
</template>

<script>

    export default {
    	methods: {
    		login() {
				$.post('./auth')
//				.then( loginData => {
//					trace("LOGIN DATA is:");
//					trace(loginData);
//				})
//				.catch( err => {
//					trace("Error");
//				})
            }
        }
    }

</script>