<template>
  <el-pagination
    v-bind="$attrs"
    class="pagination-box"
    v-model:current-page="state.page"
    v-model:page-size="state.size"
    :total="props.total"
    :page-sizes="props.pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { reactive, watch } from "vue"

const emit = defineEmits(["update:page", "update:size", "change"])

interface Props {
  page: number
  size: number
  total: number
  pageSizes?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  size: 10,
  pageSizes: () => [10, 20, 50, 100],
  total: 0
})

const state = reactive<Omit<Props, "total">>({
  page: 1,
  size: 10
})

watch(
  () => props.page,
  (val: number) => {
    state.page = val
  },
  { deep: true, immediate: true }
)

watch(
  () => props.size,
  (val: number) => {
    state.size = val
  },
  { deep: true, immediate: true }
)

const handleCurrentChange = (e: number) => {
  state.page = e
  emit("update:page", e)
  emit("change", { page: state.page, size: state.size })
}

const handleSizeChange = (e: number) => {
  state.size = e
  state.page = 1
  emit("update:page", state.page)
  emit("update:size", e)
  emit("change", { page: state.page, size: state.size })
}
</script>

<style scoped lang="scss">
.pagination-box {
  display: flex;
  justify-content: flex-end;
}
</style>
