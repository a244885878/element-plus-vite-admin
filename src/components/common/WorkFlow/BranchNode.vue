<template>
  <div class="branch-wrap">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <el-button
          type="success"
          plain
          round
          class="add-branch"
          @click="addCondition()"
          >添加条件</el-button
        >
        <div
          class="col-box"
          v-for="(item, index) in node.childNodes"
          :key="item.nodeKey"
        >
          <div class="condition-node">
            <div class="condition-node-box">
              <div
                class="auto-judge"
                @click="handleNode(item, index, node.childNodes!.length)"
              >
                <div class="title">
                  <span
                    class="node-title"
                    v-if="index !== node.childNodes!.length - 1"
                  >
                    <span
                      class="node-title-text text-overflow"
                      v-if="!item.nodeName"
                      >条件{{ index + 1 }}</span
                    >
                    <span v-else class="node-title-text text-overflow">{{
                      item.nodeName
                    }}</span>
                  </span>
                  <span v-else class="node-title" style="color: #999"
                    >默认条件
                  </span>
                  <span class="priority-title">优先级{{ index + 1 }} </span>
                  <el-icon
                    size="15"
                    color="#fff"
                    class="close"
                    v-if="index !== node.childNodes!.length - 1"
                    @click="delCondition(index)"
                    ><Close
                  /></el-icon>
                </div>
                <div
                  class="content"
                  :style="{
                    paddingTop:
                      index === node.childNodes!.length - 1 ? '5px' : '15px'
                  }"
                >
                  <div v-if="index !== node.childNodes!.length - 1">
                    <div
                      v-if="item.data?.conditionGroupList?.length"
                      class="condition-content"
                      v-html="returnConditionContent(item.data)"
                    ></div>
                    <span v-else class="placeholder">请设置条件</span>
                  </div>
                  <span v-else class="last-child-title">
                    未满足时其他条件时，将进入默认流程
                  </span>
                </div>
              </div>
              <AddNode :node="item"></AddNode>
            </div>
          </div>
          <Node
            v-for="child in item.childNodes"
            :key="child.nodeKey"
            :node="child"
          ></Node>
          <!-- 隐藏左侧线条 -->
          <template v-if="index === 0">
            <div class="top-left-cover-line"></div>
            <div class="bottom-left-cover-line"></div>
          </template>
          <!-- 隐藏右侧线条 -->
          <template v-if="index === node.childNodes!.length - 1">
            <div class="top-right-cover-line"></div>
            <div class="bottom-right-cover-line"></div>
          </template>
        </div>
      </div>
      <AddNode :node></AddNode>
    </div>
  </div>
  <ConditionDrawer
    v-model:show="conditionDrawerShow"
    :node="nodeItem"
    :nodeIndex="nodeItemIndex"
  ></ConditionDrawer>
</template>

<script setup lang="ts">
import type { NodeType } from "./Node.vue"
import AddNode from "./AddNode.vue"
import Node from "./Node.vue"
import { nanoid } from "nanoid"
import { inject, ref } from "vue"
import ConditionDrawer from "./Drawer/Condition.vue"
import { operatorOptions } from "./Drawer/data"

const { node } = defineProps<NodeType>()

const removeNode = inject<(node: NodeType["node"]) => void>("removeNode")

const nodeItem = ref<NodeType["node"]>({
  nodeName: "",
  nodeKey: "",
  nodeType: "condition",
  data: {}
})
const nodeItemIndex = ref(0)
const conditionDrawerShow = ref(false)

// 格式化条件内容
const returnConditionContent = (data: any) => {
  let content = ""
  if (data?.conditionGroupList?.length) {
    for (let i = 0; i < data.conditionGroupList.length; i++) {
      const v = data.conditionGroupList[i]
      if (i > 0) {
        content += `</br><span class="or">或</span></br>`
      }
      for (let j = 0; j < v.length; j++) {
        if (j > 0) {
          content += `<span class="also">且</span>`
        }
        const v2 = v[j]
        content += `<span>${v2.label}</span>`
        content += `<span class="operator">${operatorOptions.find(o => o.value === v2.operator)?.label}</span>`
        content += `<span>${v2.value}</span>`
      }
    }
  }
  return content
}

// 添加条件
const addCondition = () => {
  const { childNodes } = node
  const childNodesLength = childNodes?.length
  childNodes?.splice(childNodesLength! - 1, 0, {
    nodeName: "",
    nodeKey: nanoid(),
    nodeType: "condition",
    data: {}
  })
}

// 删除条件
const delCondition = (index: number) => {
  const { childNodes } = node
  childNodes?.splice(index, 1)
  if (childNodes!.length <= 1) {
    removeNode!(node)
  }
}

const handleNode = (
  item: NodeType["node"],
  index: number,
  childNodesLength: number
) => {
  // 默认条件不可编辑
  if (index === childNodesLength - 1) return
  nodeItem.value = item
  nodeItemIndex.value = index
  conditionDrawerShow.value = true
}
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

$bgcolor: #f6f8f9;

.branch-wrap {
  display: inline-flex;
  width: 100%;

  .branch-box-wrap {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    min-height: 270px;
    width: 100%;
    flex-shrink: 0;

    .branch-box {
      display: flex;
      overflow: visible;
      min-height: 180px;
      height: auto;
      border-bottom: 2px solid #ccc;
      border-top: 2px solid #ccc;
      position: relative;
      margin-top: 15px;

      .add-branch {
        justify-content: center;
        padding: 0 10px;
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translate(-50%);
        transform-origin: center center;
        z-index: 1;
        display: inline-flex;
        align-items: center;
      }

      .col-box {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background: $bgcolor;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          margin: auto;
          width: 2px;
          height: 100%;
          background-color: #cacaca;
        }

        .condition-node {
          display: inline-flex;
          flex-direction: column;
          min-height: 220px;

          .condition-node-box {
            padding-top: 30px;
            padding-right: 50px;
            padding-left: 50px;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            position: relative;
            display: inline-flex;
            flex-direction: column;
            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              width: 2px;
              height: 100%;
              background-color: #cacaca;
            }

            .auto-judge {
              position: relative;
              width: 220px;
              min-height: 72px;
              background: #fff;
              border-radius: 4px;
              padding: 15px;
              cursor: pointer;
              box-shadow: 0 2px 5px #0000001a;

              &:hover::after {
                border: 1px solid #3296fa;
                box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
              }
              &:hover .title .priority-title {
                display: none;
              }
              &:hover .title .close {
                display: block;
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
                line-height: 16px;
                font-size: 12px;

                .node-title {
                  font-size: 12px;

                  .node-title-text {
                    display: inline-block;
                    width: 70%;
                  }
                }

                .priority-title {
                  position: absolute;
                  top: 15px;
                  right: 15px;
                  color: #999;
                }

                .close {
                  font-size: 15px;
                  position: absolute;
                  top: 15px;
                  right: 15px;
                  color: #999;
                  display: none;
                }
              }

              .content {
                position: relative;
                padding-top: 15px;
                width: 200px;
                font-size: 12px;

                .condition-content {
                  color: #000;

                  :deep(.operator) {
                    color: var(--el-color-primary);
                  }
                  :deep(.also) {
                    color: var(--el-color-warning);
                    margin: 0 2px;
                  }
                  :deep(.or) {
                    color: var(--el-color-success);
                  }
                }

                .placeholder {
                  color: #999;
                }

                .last-child-title {
                  color: #000;
                }
              }
            }
          }
        }

        .top-left-cover-line {
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: $bgcolor;
          top: -3px;
          left: -1px;
        }

        .top-right-cover-line {
          right: -1px;
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: $bgcolor;
          top: -3px;
        }

        .bottom-left-cover-line {
          left: -1px;
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: $bgcolor;
          bottom: -3px;
        }

        .bottom-right-cover-line {
          right: -1px;
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: $bgcolor;
          bottom: -3px;
        }
      }
    }
  }
}
</style>
