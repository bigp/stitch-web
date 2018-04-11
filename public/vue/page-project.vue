<template>
 <div class="fullsize">
  <div class="left-pane">
   Left Pane
  </div>
  <div class="right-pane">
   Right Pane
  </div>
 </div>
</template>
<style>
 .fullsize {
  width: 100%;
  height: 100%;
 }

 .left-pane, .right-pane {
  display: block;
  position: absolute;
  top: 0px;
  bottom: 0px;
 }

 .left-pane {
  width: 200px;
  background: #ff000066;
 }

 .right-pane {
  left: 200px;
  right: 0px;
  background: #00ff0066;
 }
</style>
<script>
 export default {

 }
</script>