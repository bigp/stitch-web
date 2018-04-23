<template>
    <div :class="'btn ' + icon">
        <i v-if="emoji" :class="'v-align-mid em em-' + emoji" aria-hidden="true"></i>
        <i v-if="icon" :class="'v-align-mid icon fa fa-' + icon" aria-hidden="true"></i>
        <i v-html="label"></i>
    </div>
</template>
<script>
    export default { props: ['obj', 'label', 'emoji', 'icon'] }
</script>