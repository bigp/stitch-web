<template>
    <!-- This is the Home page, no data needed, just show the #mode-selector -->
</template>

<script>
 export default {
  mounted() {
  	var menu = this.$lookup('menu');
  	_.defer(() => {
		$$$.fx.fadeIn('#mode-selector');
		menu.reset(menu.homeMenu);
    });
  }
 }
</script>