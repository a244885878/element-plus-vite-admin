<template>
  <div>
    <EBuilder v-if="pageSchema" :pageSchema="pageSchema" ref="eBuilder" />
    <el-button type="primary" @click="verify()">校验</el-button>
  </div>
</template>

<script setup lang="ts">
import { EBuilder } from "epic-designer"
import { ref } from "vue"

interface Props {
  pageSchema: any
}
const { pageSchema } = defineProps<Props>()

const eBuilder = ref<InstanceType<typeof EBuilder>>()

const verify = async () => {
  const res = await eBuilder.value!.validate()
  console.log(res)
}
</script>

<style scoped lang="scss"></style>
