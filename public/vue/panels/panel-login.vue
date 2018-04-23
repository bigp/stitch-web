<template>
    <panel id="user-login" header="User Login">
        <field name="email" label="Email" value="your-email@domain.com"></field>
        <field name="password" label="Password" value=""></field>

        <field name="firstName" label="First Name" value="First Name"></field>
        <field name="lastName" label="Last Name" value="Last Name"></field>

        <field name="company" label="Company / Organization" value="Company"></field>
        <btn>Test</btn>
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