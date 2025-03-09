<template>
  <div class="logo-box">
    <transition :name="transitionName" mode="out-in">
      <div v-if="!store.collapse" key="expand" class="logo-container">
        <img src="@/assets/img/vite.svg" class="logo" />
        <h2 class="title">Admin</h2>
      </div>
      <div v-else key="collapse" class="logo-container collapse">
        <img src="@/assets/img/vite.svg" class="logo-fold" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import useStore from "@/store"

const { store } = useStore()
const transitionName = ref("slide")

// 根据折叠状态切换动画类型
watch(
  () => store.collapse,
  newVal => {
    transitionName.value = newVal ? "slide-left" : "slide-right"
  }
)
</script>

<style scoped lang="scss">
.logo-box {
  height: var(--nav-height);
  background: var(--menu-bg-color);
  overflow: hidden; // 防止动画溢出

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .logo {
      width: 50px;
      height: 50px;
    }

    .logo-fold {
      width: 30px;
      height: 30px;
    }

    .title {
      flex-shrink: 0;
      margin: 0 0 0 10px;
      color: #fff;
      font-size: 18px;
      white-space: nowrap;
      opacity: 1;
    }
  }
}
</style>
