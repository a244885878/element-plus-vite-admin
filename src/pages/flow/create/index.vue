<template>
  <div>
    <el-button type="primary" style="float: right" @click="publish()"
      >发布</el-button
    >
    <el-tabs v-model="active" class="tabs">
      <el-tab-pane label="基础信息" name="flow1">
        <Basic ref="basic"></Basic>
      </el-tab-pane>
      <el-tab-pane label="表单设计" name="flow2">
        <EDesigner
          title="法蝉"
          :hiddenHeader="true"
          ref="eDesigner"
          @save="save"
          :formMode="true"
        />
      </el-tab-pane>
      <el-tab-pane label="流程设计" name="flow4">
        <Flow></Flow>
      </el-tab-pane>
      <el-tab-pane label="扩展设置" name="flow5">扩展设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { EDesigner } from "epic-designer"
import Basic from "./Basic.vue"
import Flow from "./Flow.vue"
import { ElMessage } from "element-plus"

const active = ref("flow1")
const eDesigner = ref<InstanceType<typeof EDesigner>>()
const basic = ref<InstanceType<typeof Basic>>()
const pageSchema = ref<any>(null)
const key = ref(0)

const publish = async () => {
  basic.value!.ruleFormRef?.validate((val: boolean) => {
    if (!val) {
      active.value = `flow1`
    } else {
      const designerData: any = eDesigner.value!.getData()
      if (!designerData?.schemas[0]?.children?.length) {
        active.value = `flow2`
        ElMessage.error("请为流程设计表单内容")
        return
      }
      pageSchema.value = designerData
      key.value++
      console.log(designerData)
    }
  })
}

const save = (e: any) => {
  pageSchema.value = e
  key.value++
  console.log(e)
}
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
}
</style>
