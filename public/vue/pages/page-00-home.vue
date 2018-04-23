<template>
    <div class="padded">
        <!-- This is the Home page, no data needed, just show the #mode-selector -->
        <h1>Welcome to Stitch-Web!</h1>

        <div class="welcome padded-2 box-shadow">
            <p>This tool is designed to greatly improve your Creative Ads workflow!</p>
            <p>From concept to invoicing, you can do it all here!</p>
        </div>
    </div>
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