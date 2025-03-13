<template>
  <div class="base-page-box">
    <el-card shadow="hover" class="query-box" v-if="showQuery">
      <slot name="query"></slot>
    </el-card>
    <div class="table-box" v-if="showTable">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showQuery?: boolean
  showTable?: boolean
}

const { showQuery = true, showTable = true } = defineProps<Props>()
</script>

<style scoped lang="scss">
.base-page-box {
  width: 100%;
  height: calc(100vh - var(--nav-height) - 30px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 15px;

  .query-box {
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .table-box {
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    gap: 15px;
    flex-direction: column;
  }
}
</style>
