<template>
  <div class="add-node-btn-box" v-if="node.nodeType !== 'end'">
    <div class="add-node-btn">
      <el-button :icon="Plus" circle type="primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import type { Props } from "./Node.vue"

const { node } = defineProps<Props>()
</script>

<style scoped lang="scss">
.add-node-btn-box {
  width: 240px;
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }

  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 20px 0 32px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
  }
}
</style>
