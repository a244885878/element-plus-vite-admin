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
import { reactive } from "vue"
import Node from "./Node.vue"
import { nanoid } from "nanoid"

const state = reactive<any>({
  zoom: 100,
  data: [
    {
      nodeName: "发起人",
      nodeKey: nanoid(),
      nodeType: "start",
      data: {}
    },
    {
      nodeName: "审核人",
      nodeKey: nanoid(),
      nodeType: "audit",
      data: {}
    },
    {
      nodeName: "抄送人",
      nodeKey: nanoid(),
      nodeType: "send",
      data: {}
    },
    {
      nodeName: "条件分支",
      nodeKey: nanoid(),
      nodeType: "conditionBranch",
      conditionNodes: [
        {
          nodeName: "条件1",
          nodeKey: nanoid(),
          nodeType: "condition",
          priorityLevel: 1,
          data: {},
          childNodes: []
        },
        {
          nodeName: "条件2",
          nodeKey: nanoid(),
          nodeType: "condition",
          priorityLevel: 2,
          data: {},
          childNodes: []
        }
      ]
    },
    {
      nodeName: "结束",
      nodeKey: nanoid(),
      nodeType: "end"
    }
  ]
})

const handleZoom = (type: "plus" | "minus") => {
  if (type === "plus") {
    state.zoom += 10
  } else {
    state.zoom -= 10
  }
}
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
    position: relative;
    width: 100%;
    padding: 50px 0;
    transform: scale(1);
    box-sizing: border-box;
    transform-origin: 50% 0px 0px;
  }
}
</style>
