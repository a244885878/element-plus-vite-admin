<template>
  <!-- 普通节点 -->
  <GeneralNode :node v-if="node.nodeType !== 'conditionBranch'"></GeneralNode>
  <!-- 分支节点 -->
  <BranchNode :node v-else></BranchNode>
</template>

<script setup lang="ts">
import GeneralNode from "./GeneralNode.vue"
import BranchNode from "./BranchNode.vue"

export interface NodeType {
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
    data: Record<string, any>
    childNodes?: NodeType["node"][]
  }
}
const { node } = defineProps<NodeType>()
</script>

<style scoped lang="scss"></style>
