<template>
  <div class="home-box">
    <MenuBox v-if="!['sm', 'xs'].includes(store.currentSize)"></MenuBox>
    <div class="views-box">
      <Nav></Nav>
      <el-scrollbar>
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" :key="Component"></component>
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav/index.vue"
import MenuBox from "@/components/MenuBox/index.vue"
import useStore from "@/store"

const { getCurrentSize, store } = useStore()

getCurrentSize()
</script>

<style scoped lang="scss">
.home-box {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  background: #f2f3f5;
  overflow: hidden;

  .views-box {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    transition: var(--base-transition);

    .el-scrollbar {
      width: 100%;
      height: calc(100% - var(--nav-height));
      box-sizing: border-box;
      padding: 15px;
    }
  }
}
</style>
