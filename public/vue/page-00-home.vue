<template>
    <!-- This is the Home page, no data needed, just show the #mode-selector -->
</template>

<script>

    const timeStart = new Date().getTime();
 export default {
  mounted() {
	var menu = this.$lookup('menu');
    var homeMenu = this.$app.homeMenu;

    const timeNow = new Date().getTime();
    const timeDiff = timeNow - timeStart;

    if(timeDiff<1000) {
    	trace("Showing the Home-Screen mode-selector: " + timeDiff);
        _.defer(() => {
            this.$app.showModeSelector();
            menu.reset(homeMenu);
        });
	}
  }
 }
</script>