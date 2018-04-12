<template>
    <div id="mode-selector" class="box-shadow init-hidden is-centered">
        <goto v-for="(mode, i) in $root.modes" :key="mode.name"
             class="box pointer"
              @click="onModeSelected()"
             :to="{name: mode.name.toLowerCase()}"
             :class="'mode-' + mode.name.toLowerCase()"
             :style="$root.getMenuCSS(mode)">
<!-- @click="$root.onModeSelected(mode)"
             -->

            <i class="menu-name"><icon :name="mode.icon"></icon>{{mode.name}}</i>
            <i class="menu-desc">{{mode.desc}}</i>
        </goto>
    </div>
</template>

<script>
export default {
    methods: {
		onModeSelected() {
			$$$.fx.fadeOut('#mode-selector');
        }
    }
}
</script>