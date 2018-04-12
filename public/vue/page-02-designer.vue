<template>
 <outer class="page page-designer fullsize project-bg" :style="$app.getMenuCSS()">
  <p>Designer panel</p>

  <div v-if="brand">
   The brand you are designing is: {{brand}}
   <i v-if="campaign">, {{campaign}}</i>
   <i v-if="ad">, {{ad}}</i>
  </div>
 </outer>
</template>

<script>
	export default {

	}
</script>