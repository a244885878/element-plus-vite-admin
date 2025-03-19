<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="state.ruleForm"
    :rules="state.rules"
    label-width="auto"
    status-icon
    class="form-box"
  >
    <el-form-item label="唯一标识key" prop="key">
      <el-input v-model="state.ruleForm.key" />
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="state.ruleForm.name" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { FormRules, FormInstance } from "element-plus"

const ruleFormRef = ref<FormInstance>()

type State = {
  ruleForm: {
    key: string
    name: string
  }
  rules: FormRules
}
const state = reactive<State>({
  ruleForm: {
    key: "",
    name: ""
  },
  rules: {
    key: [
      {
        required: true,
        message: "请填写",
        trigger: "blur"
      }
    ],
    name: [
      {
        required: true,
        message: "请填写",
        trigger: "blur"
      }
    ]
  }
})

defineExpose({
  ruleFormRef
})
</script>

<style scoped lang="scss">
.form-box {
  margin: 0 auto;
  padding: 30px 0;
}
</style>
