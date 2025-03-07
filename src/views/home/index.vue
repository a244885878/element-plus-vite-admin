<template>
  <div class="home-box">
    <div class="menu-box">
      <Logo></Logo>
      <Menu></Menu>
    </div>
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
import Menu from "@/components/Menu/index.vue"
import Nav from "@/components/Nav/index.vue"
import Logo from "@/components/Logo/index.vue"
</script>

<style scoped lang="scss">
.home-box {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  background: #f2f3f5;
  overflow: hidden;

  .menu-box {
    width: var(--menu-width);
    height: 100%;
    background: var(--menu-bg-color);
    flex-shrink: 0;
  }

  .views-box {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;

    .el-scrollbar {
      width: 100%;
      height: calc(100% - var(--nav-height));
      box-sizing: border-box;
      padding: 15px;
    }
  }
}
</style>
