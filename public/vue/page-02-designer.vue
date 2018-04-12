<template>
 <div class="page page-designer fullsize">
  <!-- Left Nav -->
  <outer class="left-pane">
   Campaigns
  </outer>

  <!-- Right (main) Nav -->
  <outer class="right-pane" :style="$root.getMenuCSS()">
   <p>Designer panel</p>

   <div v-if="brand">
    The brand you are designing for is: {{brand}}
   </div>
  </outer>
 </div>
</template>

<script>
	export default {

	}
</script>