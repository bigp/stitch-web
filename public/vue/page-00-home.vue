<template>

</template>

<script>
 export default {
  mounted() {
  	_.defer(() => {
		$$$.fx.fadeIn('#mode-selector');
		$$$.menu.reset($$$.menu.homeMenu);
    });
  }
 }
</script>