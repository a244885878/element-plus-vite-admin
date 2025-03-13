<template>
  <el-table-column v-bind="column">
    <template #header="{ column: headColumn, $index }">
      <slot name="columnHeader" :data="{ headColumn, $index }">
        <span style="color: #e84c4c" v-if="column.required">*</span>
        <span>{{ column.label }}</span>
        <el-tooltip
          v-if="column.headTooltip"
          effect="dark"
          :content="column.headTooltip"
          placement="top-start"
        >
          <el-icon style="margin-left: 3px"><QuestionFilled /></el-icon>
        </el-tooltip>
      </slot>
    </template>
    <template #default="{ row, $index }">
      <slot name="column" :data="{ column, row, index: $index }">
        <span v-if="column.prop === '_index'">{{ $index + 1 }}</span>
        <span v-else>{{ format(row, column) }}</span>
      </slot>
      <template v-if="column?.child?.length">
        <TableColumns
          v-for="(child, i) in column.child"
          :key="i"
          :column="child"
        >
          <template #columnHeader="{ data: { headColumn, $index: cIndex } }">
            <slot
              name="columnHeader"
              :data="{ headColumn, $index: cIndex }"
            ></slot>
          </template>
          <template
            #column="{ data: { column: cColumn, row: cRow, index: cIndex } }"
          >
            <slot
              name="column"
              :data="{ column: cColumn, row: cRow, index: cIndex }"
            ></slot>
          </template>
        </TableColumns>
      </template>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { formatAmount } from "@/utils/tools"
import { TableColumnData } from "@/types"
import TableColumns from "./TableColumns.vue"

interface Props {
  column: TableColumnData
}
const { column } = defineProps<Props>()

const format = (row: any, column: any) => {
  if (column.formatter) {
    return column.formatter(row)
  } else {
    return column.formatAmount
      ? formatAmount(row[column.prop!] || 0)
      : row[column.prop!]
  }
}
</script>

<style scoped lang="scss"></style>
