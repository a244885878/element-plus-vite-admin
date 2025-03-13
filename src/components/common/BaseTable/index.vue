<template>
  <el-table ref="table" v-bind="$attrs" :data="props.tableData" class="table">
    <template #empty>
      <slot name="empty">
        <el-empty description="暂无数据" />
      </slot>
    </template>
    <el-table-column
      v-if="props.showSelection"
      :reserve-selection="true"
      type="selection"
      width="55"
      fixed="left"
      :selectable="props.selectable"
    />
    <TableColumns v-for="(item, index) in columns" :key="index" :column="item">
      <template #columnHeader="{ data: { headColumn, $index } }">
        <slot name="columnHeader" :data="{ headColumn, $index }"></slot>
      </template>
      <template #column="{ data: { column, row, index: $index } }">
        <slot name="column" :data="{ column, row, index: $index }"></slot>
      </template>
    </TableColumns>
  </el-table>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { ElTable, ElTableColumn } from "element-plus"
import { TableColumnData } from "@/types"
import TableColumns from "./TableColumns.vue"

interface Props {
  tableData: Record<string, any>[]
  tableColumnData: TableColumnData[]
  showSelection?: boolean
  showIndex?: boolean
  selectable?: any
}
const props = withDefaults(defineProps<Props>(), {
  showSelection: false,
  selectable: undefined
})

const table = ref<InstanceType<typeof ElTable>>()

const columns = computed(() => {
  const list = [...(props.tableColumnData ?? [])]
  if (props.showIndex) {
    list.unshift({
      label: "序号",
      prop: "_index",
      minWidth: 80,
      fixed: "left"
    })
  }
  return list
})

defineExpose({
  table: table.value
})
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  height: 100%;
}
</style>
