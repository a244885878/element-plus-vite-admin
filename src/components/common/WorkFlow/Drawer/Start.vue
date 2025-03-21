<template>
  <el-drawer
    size="500"
    v-model="show"
    append-to-body
    title="发起人设置"
    @open="open"
  >
    <el-alert
      title="不指定则默认所有人都可发起此审批"
      type="info"
      :closable="false"
    />
    <el-form :model="state.form" label-width="auto" class="form-box">
      <el-form-item label="节点名称" label-position="top">
        <el-input v-model="state.form.nodeName" placeholder="请输入节点名称" />
      </el-form-item>
      <el-form-item label="谁可以发起此审批" label-position="top">
        <el-select
          v-model="state.form.staffIdList"
          filterable
          multiple
          placeholder="请选择人员"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import type { NodeType } from "../Node.vue"
import { reactive } from "vue"

const { node } = defineProps<NodeType>()

const show = defineModel("show", { type: Boolean, default: false })

const options = [
  { value: 1, label: "张三" },
  { value: 2, label: "李四" },
  { value: 3, label: "王五" }
]

type State = {
  form: {
    nodeName: string
    staffIdList: number[]
    staffNameList: string[]
  }
}
const state = reactive<State>({
  form: {
    nodeName: "",
    staffIdList: [],
    staffNameList: []
  }
})

const close = () => {
  show.value = false
}

const open = () => {
  state.form = JSON.parse(JSON.stringify(node.data))
  state.form.nodeName = node.nodeName
}

const save = () => {
  state.form.staffNameList = []
  state.form.staffIdList?.forEach(v => {
    const staff = options.find(o => o.value === v)
    state.form.staffNameList.push(staff!.label)
  })
  node.data = state.form
  node.nodeName = state.form.nodeName
  close()
}
</script>

<style scoped lang="scss">
.form-box {
  margin-top: 10px;
}
</style>
