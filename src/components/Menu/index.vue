<template>
  <el-menu
    router
    :default-active="activePath"
    :unique-opened="false"
    :collapse="collapse"
    :collapse-transition="false"
    class="menu-box"
  >
    <el-scrollbar>
      <MenuItem :menu-data="menuData"></MenuItem>
    </el-scrollbar>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import MenuItem from "./MenuItem.vue"
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router"
import useStore from "@/store"

const {
  store: { menuData }
} = useStore()

const route = useRoute()
const collapse = ref(false)
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
.menu-box {
  width: 100%;
  height: 100%;
  transition: width 0.3s;
  border: 1px solid transparent;

  .el-scrollbar {
    height: calc(100% - var(--nav-height));
  }
}
</style>
