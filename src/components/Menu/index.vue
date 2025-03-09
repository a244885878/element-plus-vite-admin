<template>
  <el-scrollbar>
    <el-menu
      router
      :default-active="activePath"
      :unique-opened="false"
      :collapse="store.collapse"
      :collapse-transition="false"
      class="menu"
    >
      <MenuItem :menu-data="store.menuData"></MenuItem>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import MenuItem from "./MenuItem.vue"
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router"
import useStore from "@/store"

const { store } = useStore()

const route = useRoute()
const activePath = ref("/")

watch(
  () => route,
  (newVal: RouteLocationNormalizedLoaded) => {
    activePath.value = newVal.path
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: calc(100% - var(--nav-height));
}

.menu {
  width: 100%;
  height: 100%;
  transition: var(--base-transition);
  border: 1px solid transparent;
}
</style>
