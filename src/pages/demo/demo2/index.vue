<template>
  <BasePage>
    <template #table>
      <BaseTable
        showIndex
        showSelection
        :tableData="tableData"
        :tableColumnData="tableColumnData"
        border
      >
        <template #column="{ data: { column, row } }">
          <template v-if="column.prop === 'name2'">
            <span style="color: purple">{{ row[column.prop] }}</span>
          </template>
        </template>
      </BaseTable>
      <BasePaging background :page="1" :size="10" :total="20"></BasePaging>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
const tableData = [
  {
    name: "李",
    name2: "小李",
    age: 20,
    address: "成都市xxx"
  },
  {
    name: "张",
    name2: "小张",
    age: 21,
    address: "广元市xxx"
  }
]
const tableColumnData = [
  {
    label: "姓名",
    prop: "name",
    child: [
      {
        label: "小名",
        prop: "name2",
        required: true,
        headTooltip: "哈哈哈"
      }
    ]
  },
  {
    label: "年龄",
    prop: "age",
    formatAmount: true
  },
  {
    label: "地址",
    prop: "address"
  }
]
</script>
