<template>
  <div class="sc-workflow-design">
    <div class="zoom-scale">
      <el-button
        :icon="Plus"
        circle
        @click="handleZoom('plus')"
        :disabled="state.zoom >= 150"
      />
      <span class="zoom-text">{{ state.zoom }}%</span>
      <el-button
        :icon="Minus"
        circle
        @click="handleZoom('minus')"
        :disabled="state.zoom <= 40"
      />
    </div>
    <div class="box-scale" :style="{ transform: `scale(${state.zoom / 100})` }">
      <Node :node="item" v-for="item in state.data" :key="item.nodeKey"></Node>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Minus } from "@element-plus/icons-vue"
import { reactive, provide } from "vue"
import Node from "./Node.vue"
import { nanoid } from "nanoid"
import type { NodeType } from "./Node.vue"

export type List = {
  name: string
  type: string
  icon: string
  color: string
}

type State = {
  zoom: number
  data: NodeType["node"][]
}
const state = reactive<State>({
  zoom: 100,
  data: [
    {
      nodeName: "发起人",
      nodeKey: nanoid(),
      nodeType: "start",
      data: {}
    },
    {
      nodeName: "结束",
      nodeKey: nanoid(),
      nodeType: "end"
    }
  ]
})

// 缩放
const handleZoom = (type: "plus" | "minus") => {
  if (type === "plus") {
    state.zoom += 10
  } else {
    state.zoom -= 10
  }
}

// 递归查找父元素
function findParentAndIndex(
  nodeKey: string,
  nodes: NodeType["node"][],
  parent: NodeType["node"] | null = null
): { parent: NodeType["node"] | null; index: number } | null {
  for (let i = 0; i < nodes.length; i++) {
    // 如果当前节点匹配，则返回当前层级的父节点以及该节点在数组中的下标
    if (nodes[i].nodeKey === nodeKey) {
      return { parent, index: i }
    }
    // 若存在子节点，则递归查找
    if (nodes[i].childNodes && nodes[i].childNodes!.length > 0) {
      const result = findParentAndIndex(nodeKey, nodes[i].childNodes!, nodes[i])
      if (result) return result
    }
  }
  return null
}

// 添加节点
const addNode = (node: NodeType["node"], list: List) => {
  const index = state.data.findIndex(v => v.nodeKey === node.nodeKey)
  const obj: NodeType["node"] = {
    nodeName: "",
    nodeKey: nanoid(),
    nodeType: list.type as NodeType["node"]["nodeType"],
    data: {}
  }
  // 审批节点
  if (list.type === "audit") {
    obj.nodeName = "审批人"
  }
  // 抄送节点
  if (list.type === "send") {
    obj.nodeName = "抄送人"
  }
  // 条件分支
  if (list.type === "conditionBranch") {
    obj.nodeName = "条件分支"
    obj.childNodes = [
      {
        nodeName: "",
        nodeKey: nanoid(),
        nodeType: "condition",
        data: {}
      },
      {
        nodeName: "默认条件",
        nodeKey: nanoid(),
        nodeType: "condition"
      }
    ]
  }
  // 外层节点
  if (index !== -1) {
    state.data.splice(index + 1, 0, obj)
  } else {
    // 分支内节点
    if (node.nodeType === "condition") {
      // 分支下新增
      if (!node.childNodes) {
        node.childNodes = []
      }
      node.childNodes.unshift(obj)
    } else {
      // 普通节点下新增
      const parentObj = findParentAndIndex(node.nodeKey, state.data)
      parentObj!.parent!.childNodes!.splice(parentObj!.index + 1, 0, obj)
    }
  }
}

// 删除节点
const removeNode = (node: NodeType["node"]) => {
  const index = state.data.findIndex(v => v.nodeKey === node.nodeKey)
  // 外层节点
  if (index !== -1) {
    state.data = state.data.filter(v => v.nodeKey !== node.nodeKey)
  } else {
    // 分支内节点
    const parentObj = findParentAndIndex(node.nodeKey, state.data)
    parentObj!.parent?.childNodes?.splice(parentObj!.index, 1)
  }
}

provide("addNode", addNode)
provide("removeNode", removeNode)
</script>

<style scoped lang="scss">
$bgcolor: #f6f8f9;

.sc-workflow-design {
  height: 70vh;
  background: $bgcolor;
  overflow: auto;
  position: relative;

  .zoom-scale {
    z-index: 999;
    position: fixed;
    top: 220px;
    right: 50px;
    display: flex;
    align-items: center;

    .zoom-text {
      margin: 0 10px;
      font-size: 15px;
      color: #7a7a7a;
    }
  }

  .box-scale {
    display: inline-block;
    position: relative;
    width: 100%;
    min-height: 100%;
    min-width: min-content;
    padding: 54.5px 0px;
    background: $bgcolor;
    transform-origin: 50% 0px 0px;
  }
}
</style>
