<template>
  <!-- 普通节点 -->
  <GeneralNode :node v-if="node.nodeType !== 'conditionBranch'"></GeneralNode>
  <!-- 分支节点 -->
  <BranchNode :node v-else></BranchNode>
</template>

<script setup lang="ts">
import GeneralNode from "./GeneralNode.vue"
import BranchNode from "./BranchNode.vue"

export interface Props {
  node: {
    nodeName: string
    nodeKey: string
    nodeType:
      | "start"
      | "end"
      | "audit"
      | "send"
      | "conditionBranch"
      | "condition"
    data?: Record<string, any>
    conditionNodes?: {
      nodeName: Props["node"]["nodeName"]
      nodeKey: Props["node"]["nodeKey"]
      nodeType: Props["node"]["nodeType"]
      priorityLevel: number
      data?: Record<string, any>
      childNodes?: Props["node"][]
    }[]
  }
}
const { node } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
