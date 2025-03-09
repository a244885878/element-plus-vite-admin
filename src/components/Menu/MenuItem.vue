<template>
  <template v-for="(item, index) in menuData" :key="index">
    <template v-if="!item.meta.hidden">
      <el-sub-menu :index="item.path" v-if="item.children?.length">
        <template #title>
          <el-icon>
            <component :is="item?.meta?.icon"></component>
          </el-icon>
          <span class="menu-title">{{ item?.meta?.title }}</span>
        </template>
        <MenuItem :menu-data="item.children"></MenuItem>
      </el-sub-menu>
      <el-menu-item :index="item.path" v-else @click="handleSubMenu()">
        <el-icon>
          <component :is="item?.meta?.icon"></component>
        </el-icon>
        <span class="menu-title">{{ item?.meta?.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue"
import type { Menu } from "@/store/index"
import useStore from "@/store"

const { store } = useStore()

interface Props {
  menuData: Menu[]
}
const { menuData } = defineProps<Props>()

const handleSubMenu = () => {
  store.drawerMenuShow = false
}
</script>

<style scoped lang="scss">
.menu-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
