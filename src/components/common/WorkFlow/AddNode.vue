<template>
  <div class="add-node-btn-box" v-if="node.nodeType !== 'end'">
    <div class="add-node-btn">
      <el-popover placement="right-start" :width="270" trigger="click">
        <template #reference>
          <el-button :icon="Plus" circle type="primary" />
        </template>
        <ul class="handle-list">
          <li
            class="handle-item"
            v-for="item in list"
            :key="item.type"
            @click="addNode!(node, item)"
          >
            <el-icon size="18" :color="item.color">
              <component :is="item.icon"></component>
            </el-icon>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import type { NodeType } from "./Node.vue"
import { ref, inject } from "vue"
import type { List } from "./index.vue"

const { node } = defineProps<NodeType>()

const addNode = inject<(node: NodeType["node"], list: List) => void>("addNode")

const list = ref<List[]>([
  {
    name: "审批节点",
    type: "audit",
    icon: "UserFilled",
    color: "#e6a23c"
  },
  {
    name: "抄送节点",
    type: "send",
    icon: "Promotion",
    color: "#409eff"
  },
  {
    name: "条件分支",
    type: "conditionBranch",
    icon: "Share",
    color: "#67c23a"
  }
])
</script>

<style scoped lang="scss">
.add-node-btn-box {
  width: 240px;
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }

  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 20px 0 32px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
  }
}

.handle-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .handle-item {
    width: 80px;
    text-align: center;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #606266;

    i {
      border: 1px solid var(--el-border-color-light);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      line-height: 38px;
      font-size: 18px;
      cursor: pointer;
      margin-bottom: 5px;

      &:hover {
        border: 1px solid var(--el-color-primary);
        background: var(--el-color-primary);
        color: #fff !important;
      }
    }
  }
}
</style>
