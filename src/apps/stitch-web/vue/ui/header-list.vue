<template>
    <div :class="cssPrefix">
        <ul class="list">
            <li class="first">
                <i :class="iconRender"></i> {{title}}
            </li>

            <li v-if="headerCondition">
                <slot></slot>
            </li>

            <li v-for="(value,key) in items" :key="key"
                :class="{'selected': itemSelector(value)}">
                <btn color="#ea2"
                    @click="$emit('item-click', value)">
                    {{itemRenderer(value)}}
                </btn>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        title:String,
        icon:String,
        cssUL: {default:'inline-block'},
        items:Array,
        itemSelector:Function,
        itemRenderer:Function,
        headerCondition: {type:Boolean, default:true},
    },

    computed: {
        cssPrefix() {
            return this.title.replace(/[^0-9a-z]/gi, '').toLowerCase();
        },

        iconRender() {
            return this.icon ? ('fa fa-' + this.icon) : '';
        }
    }
}
</script>

