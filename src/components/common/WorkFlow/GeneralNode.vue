<template>
  <div class="node-wrap">
    <div class="node-wrap-box" :class="returnNodeClass()" @click="handleNode()">
      <div class="title">
        <!-- 开始|审核-图标 -->
        <el-icon
          size="12"
          color="#fff"
          style="margin-right: 5px"
          v-if="['start', 'audit'].includes(node.nodeType)"
          ><UserFilled
        /></el-icon>
        <!-- 抄送人-图标 -->
        <el-icon
          size="12"
          color="#fff"
          style="margin-right: 5px"
          v-else-if="['send'].includes(node.nodeType)"
          ><Promotion
        /></el-icon>
        <!-- 标题 -->
        <span class="title-text text-overflow">{{ node.nodeName }}</span>
        <!-- 删除按钮 -->
        <el-icon size="15" color="#fff" class="close" @click="removeNode!(node)"
          ><Close
        /></el-icon>
      </div>
      <div class="content">
        <!-- 开始-内容 -->
        <span v-if="node.nodeType === 'start'">
          <span v-if="node.data?.staffNameList?.length">
            {{ node.data?.staffNameList.join("、") }}
          </span>
          <span v-else>所有人</span>
        </span>
        <!-- 抄送人-内容 -->
        <template v-else-if="['send'].includes(node.nodeType)">
          <span v-if="node.data?.staffNameList?.length">
            {{ node.data?.staffNameList.join("、") }}
          </span>
          <span v-else class="placeholder">发起人自选</span>
        </template>
        <!-- 审核人-内容 -->
        <template v-else-if="['audit'].includes(node.nodeType)">
          <span class="placeholder">请选择</span>
        </template>
        <!-- 结束-内容 -->
        <span v-else-if="node.nodeType === 'end'" class="placeholder"
          >流程结束</span
        >
      </div>
    </div>
    <AddNode :node></AddNode>
  </div>
  <StartDrawer v-model:show="startDrawerShow" :node></StartDrawer>
  <SendDrawer v-model:show="sendDrawerShow" :node></SendDrawer>
  <AuditDrawer v-model:show="auditDrawerShow" :node></AuditDrawer>
</template>

<script setup lang="ts">
import type { NodeType } from "./Node.vue"
import AddNode from "./AddNode.vue"
import { inject, ref } from "vue"
import StartDrawer from "./Drawer/Start.vue"
import SendDrawer from "./Drawer/Send.vue"
import AuditDrawer from "./Drawer/Audit.vue"

const removeNode = inject<(node: NodeType["node"]) => void>("removeNode")

const { node } = defineProps<NodeType>()

const startDrawerShow = ref(false)
const sendDrawerShow = ref(false)
const auditDrawerShow = ref(false)

const returnNodeClass = () => {
  return node.nodeType
}

const handleNode = () => {
  if (node.nodeType === "start") {
    startDrawerShow.value = true
  }
  if (node.nodeType === "send") {
    sendDrawerShow.value = true
  }
  if (node.nodeType === "audit") {
    auditDrawerShow.value = true
  }
}
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

$bgcolor: #f6f8f9;

.node-wrap {
  display: inline-flex;
  width: 100%;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 50px;
  position: relative;
  z-index: 1;

  .node-wrap-box {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 220px;
    min-height: 72px;
    flex-shrink: 0;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 5px #0000001a;
    z-index: 1;

    &:hover::after {
      border: 1px solid #3296fa;
      box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
    }
    &::before {
      content: "";
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translate(-50%);
      width: 0px;
      border-style: solid;
      border-width: 8px 6px 4px;
      border-color: rgb(202, 202, 202) transparent transparent;
      background: #f6f8f9;
      z-index: 0;
    }
    &::after {
      pointer-events: none;
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      border-radius: 4px;
      transition: all 0.1s;
    }

    .title {
      height: 24px;
      line-height: 24px;
      color: #fff;
      padding-left: 16px;
      padding-right: 30px;
      border-radius: 4px 4px 0 0;
      position: relative;
      display: flex;
      align-items: center;
      font-size: 12px;

      .title-text {
        display: inline-block;
      }

      .close {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        display: none;
      }
    }

    .content {
      position: relative;
      padding: 15px;
      font-size: 12px;

      .placeholder {
        color: #999;
      }
    }
  }

  .start {
    .title {
      background: var(--el-color-info);
    }
    &::before {
      display: none;
    }
  }

  .audit {
    .title {
      background: var(--el-color-warning);
    }
    &:hover .close {
      display: block;
    }
  }

  .send {
    .title {
      background: var(--el-color-primary);
    }
    &:hover .close {
      display: block;
    }
  }

  .end {
    .title {
      background: var(--el-color-info);
    }
    cursor: default;
    &:hover::after {
      border: none;
      box-shadow: 0 2px 5px #0000001a;
    }
  }
}
</style>
