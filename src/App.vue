<script setup lang="ts">
    import { routes } from "@/router";
</script>

<template>
    <div class="nav">
        <RouterLink
            v-for="route in routes.slice(1)"
            :to="route.path"
            class="nav_item"
        >
            {{ route.name }}
        </RouterLink>
    </div>
    <RouterView />
</template>

<style lang="less" scoped>
    .nav {
        display: flex;
        align-items: center;
        justify-content: center;
        // position: absolute;
        // top: 0;
        // left: 0;
        width: calc(100vw - @scrollWidth);
        background-color: var(--vt-c-text-light-2);
        color: var(--vt-c-text-dark-2);
        z-index: 1000;
        &_item {
            padding: 4px 8px;
            color: inherit;
            text-decoration: none;
        }
    }
</style>
