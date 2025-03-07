<template>
  <div class="logo-box">
    <img src="@/assets/img/vite.svg" class="logo" />
    <h2>Admin</h2>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo-box {
  width: 100%;
  height: var(--nav-height);
  background: var(--menu-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  .logo {
    width: 50px;
    height: 50px;
  }

  h2 {
    color: #fff;
    margin-left: 10px;
  }
}
</style>
