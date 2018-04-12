<template>
    <ul id="top-bar">
        <ul class="breadcrumb pointer">
            <li v-for="(menu, i) in $root.menus"
                :class="'crumb cr-' + i"
                :style="$root.getMenuCSS(menu)"
                @click='$root.onMenuClick(menu)'>
                <icon :name="menu.icon"></icon>
                <i>{{menu.name}}</i>
            </li>
        </ul>
        <ul id="menu-bar" class="pointer">
            <li>File</li>
            <li>Edit</li>
            <li>View</li>
            <li>Tools</li>
        </ul>
        <ul id="right-bar" class="pointer">
            <icon name="question-circle"></icon>
            <icon name="bug"></icon>
        </ul>
    </ul>
</template>