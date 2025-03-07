<template>
  <div class="nav-box">
    <NavTop></NavTop>
    <RouterTag></RouterTag>
  </div>
</template>

<script setup lang="ts">
import NavTop from "./NavTop.vue"
import RouterTag from "./RouterTag.vue"
</script>

<style scoped lang="scss">
.nav-box {
  width: 100%;
  height: var(--nav-height);
  background: #fff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid #f0f2f5;
}
</style>
