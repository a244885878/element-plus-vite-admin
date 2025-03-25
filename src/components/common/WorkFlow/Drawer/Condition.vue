<template>
  <el-drawer
    size="600"
    v-model="show"
    append-to-body
    title="条件设置"
    @open="open"
  >
    <el-form :model="state.form" label-width="auto" class="form-box">
      <el-form-item label="节点名称" label-position="top">
        <el-input v-model="state.form.nodeName" placeholder="请输入节点名称" />
      </el-form-item>
      <el-form-item
        :label="index === 0 ? '满足以下条件时进入当前分支' : '或满足'"
        label-position="top"
        v-for="(item, index) in state.form.conditionGroupList"
        :key="index"
      >
        <div class="condition-group-editor">
          <div class="header-box">
            <span>条件组 {{ index + 1 }}</span>
            <el-icon
              class="del-button"
              color="#909399"
              size="20"
              @click="removeGroup(index)"
              ><Delete
            /></el-icon>
          </div>
          <div class="condition-title-box">
            <div class="condition-title">条件字段</div>
            <div class="condition-title">运算符</div>
            <div class="condition-title">值</div>
          </div>
          <template v-for="(item2, index2) in item" :key="index2">
            <div class="condition-relation">
              <span v-if="index2 === 0">当</span>
              <span v-else>且</span>
              <el-icon
                class="del-button"
                color="#909399"
                size="18"
                @click="removeCondition(index, index2)"
                v-if="item.length > 1"
                ><Delete
              /></el-icon>
            </div>
            <div class="condition-form-box">
              <el-input
                v-model="item2.label"
                class="condition-form"
                placeholder="自定义条件字段"
              />
              <el-select v-model="item2.operator" placeholder="请选择">
                <el-option
                  v-for="o in operatorOptions"
                  :key="o.value"
                  :label="o.label"
                  :value="o.value"
                />
              </el-select>
              <el-input
                v-model="item2.value"
                class="condition-form"
                placeholder="值"
              />
            </div>
          </template>
          <div class="add-operator-button">
            <el-button type="primary" link @click="addOperator(index)">
              + 添加自定义条件
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-button
        type="primary"
        plain
        class="add-group-button"
        @click="addGroup()"
        >+ 添加条件组</el-button
      >
    </el-form>
    <template #footer>
      <div>
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import type { NodeType } from "../Node.vue"
import { reactive } from "vue"
import { ElMessage } from "element-plus"
import { operatorOptions } from "./data"

type Props = {
  node: NodeType["node"]
  nodeIndex: number
}
const { node, nodeIndex } = defineProps<Props>()

const show = defineModel("show", { type: Boolean, default: false })

type Condition = { label: string; operator: string; value: string }
type State = {
  form: {
    nodeName: string
    conditionGroupList: Condition[][]
  }
}
const state = reactive<State>({
  form: {
    nodeName: "",
    conditionGroupList: []
  }
})

// 删除条件组
const removeGroup = (index: number) => {
  state.form.conditionGroupList.splice(index, 1)
}

// 添加条件组
const addGroup = () => {
  state.form.conditionGroupList.push([
    {
      label: "",
      operator: "==",
      value: ""
    }
  ])
}

// 删除条件
const removeCondition = (index: number, index2: number) => {
  state.form.conditionGroupList[index].splice(index2, 1)
}

// 添加条件
const addOperator = (index: number) => {
  state.form.conditionGroupList[index].push({
    label: "",
    operator: "==",
    value: ""
  })
}

const close = () => {
  show.value = false
}

const open = () => {
  state.form = JSON.parse(JSON.stringify(node.data))
  if (!node.nodeName) {
    state.form.nodeName = `条件${nodeIndex + 1}`
  } else {
    state.form.nodeName = node.nodeName
  }
  if (!state.form.conditionGroupList) {
    state.form.conditionGroupList = []
  }
}

const save = () => {
  const { conditionGroupList } = state.form
  for (let i = 0; i < conditionGroupList.length; i++) {
    const v = conditionGroupList[i]
    for (let j = 0; j < v.length; j++) {
      const v2 = v[j]
      if (!v2.label || !v2.value) {
        return ElMessage.warning("存在未填写完成的条件")
      }
    }
  }
  node.data = state.form
  node.nodeName = state.form.nodeName
  close()
}
</script>

<style scoped lang="scss">
.form-box {
  margin-top: 10px;

  .condition-group-editor {
    border-radius: 4px;
    border: 1px solid #e4e5e7;
    position: relative;
    margin-bottom: 16px;
    width: 100%;

    .header-box {
      background-color: #f4f6f8;
      padding: 0 12px;
      font-size: 14px;
      color: #171e31;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .del-button {
      cursor: pointer;
      &:hover {
        color: var(--el-color-danger);
      }
    }

    .condition-title-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .condition-title {
        padding: 16px 0;
        width: 100%;
        min-width: 120px;
        color: #909399;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
      }
    }

    .condition-relation {
      color: #9ca2a9;
      align-items: center;
      height: 36px;
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
    }

    .condition-form-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      box-sizing: border-box;
      gap: 15px;
    }

    .add-operator-button {
      height: 44px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 12px;
    }
  }

  .add-group-button {
    width: 100%;
  }
}
</style>
