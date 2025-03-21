<template>
  <el-drawer v-model="show" v-bind="$attrs">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
const show = defineModel("show", { type: Boolean, default: false })
</script>

<style scoped lang="scss"></style>
