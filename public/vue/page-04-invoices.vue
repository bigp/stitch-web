<template>
 <outer class="page page-invoices fullsize project-bg" :style="$root.getMenuCSS()">
  Invoices

  <div v-if="brand">
   The brand you are invoicing is: {{brand}}
   <i v-if="campaign">, {{campaign}}</i>
   <i v-if="ad">, {{ad}}</i>
  </div>
 </outer>
</template>

<script>
	export default {

	}
</script>