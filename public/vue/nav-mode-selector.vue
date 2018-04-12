<template>
    <div id="mode-selector" class="fader fullsize init-hidden">
        <div class="panel box-shadow is-centered">
            <goto v-for="(mode, i) in $root.modes" :key="mode.name"
                 class="box pointer"
                 :to="{name: mode.name.toLowerCase()}"
                 :class="'mode-' + mode.name.toLowerCase()"
                 :style="$root.getMenuCSS(mode)">
    <!-- @click="$root.onModeSelected(mode)"
                 -->

                <i class="menu-name"><icon :name="mode.icon"></icon>{{mode.name}}</i>
                <i class="menu-desc">{{mode.desc}}</i>
            </goto>
        </div>
    </div>
</template>

<script>

var $modeSelector;

export default {
    mounted() {
    	$modeSelector = $('#mode-selector');
    }
}

window.addEventListener('mousedown', function checkIfOutside(e) {
	if(!$modeSelector.is(':visible')) return;

	trace("Clicked outside...")
	$$$.fx.fadeOut($modeSelector);

	e.preventDefault();
	e.stopImmediatePropagation();
	e.stopPropagation();
});
</script>