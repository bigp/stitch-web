<template>
 <outer class="page page-animator fullsize project-bg" :style="$root.getMenuCSS()">
  Animator 101.

  <div v-if="brand">
   The brand you are animating is: {{brand}}
   <i v-if="campaign">, {{campaign}}</i>
   <i v-if="ad">, {{ad}}</i>
  </div>
 </outer>
</template>

<script>
	export default {

	}
</script>