<template>
  <div class="menu-box" :class="store.collapse ? 'menu-fold-box' : ''">
    <Logo></Logo>
    <Menu></Menu>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu/index.vue"
import Logo from "@/components/Logo/index.vue"
import useStore from "@/store"

const { store } = useStore()
</script>

<style scoped lang="scss">
.menu-box {
  width: var(--menu-width);
  height: 100%;
  background: var(--menu-bg-color);
  flex-shrink: 0;
  transition: var(--base-transition);
}

.menu-fold-box {
  width: var(--menu-fold-width);
}
</style>
