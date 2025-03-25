<template>
  <el-drawer
    size="600"
    v-model="show"
    append-to-body
    title="审核人设置"
    @open="open"
  >
    <el-form :model="state.form" label-width="auto" class="form-box">
      <el-form-item label="节点名称" label-position="top">
        <el-input v-model="state.form.nodeName" placeholder="请输入节点名称" />
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

type State = {
  form: {
    nodeName: string
  }
}
const state = reactive<State>({
  form: {
    nodeName: ""
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
  node.data = state.form
  node.nodeName = state.form.nodeName
  console.log(node.data)
}
</script>

<style scoped lang="scss">
.form-box {
  margin-top: 10px;
}
</style>
