<template>
  <div class="router-tag-box">
    <el-tabs
      @tab-click="handleTag"
      @tab-remove="removeTag"
      v-model="activeTab"
      type="card"
      :closable="tagsList.length > 1"
      @contextmenu="contextmenu"
    >
      <el-tab-pane
        v-for="item in tagsList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <ul
      class="popover-ul"
      v-if="popoverData.show"
      :style="{
        left: popoverData.left + 10 + 'px',
        top: popoverData.top + 5 + 'px'
      }"
    >
      <li @click="refresh()">刷新</li>
      <li @click="removeTag(popoverData.data.name)" v-if="tagsList.length > 1">
        关闭
      </li>
      <li @click="closeRight()">关闭右侧</li>
      <li @click="closeOther()">关闭其他</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { TabsPaneContext, TabPaneName } from "element-plus"

type Tag = { path: string; name: string; label: string }

const router = useRouter()
const route = useRoute()

const localTagsList: Tag[] = JSON.parse(localStorage.getItem("tagsList")!)
let activeTabIndex = 0

const activeTab = ref("")
const tagsList = ref<Tag[]>(localTagsList || [])
const popoverData = ref<{
  left: number
  top: number
  data: Tag
  show: boolean
  index: number
}>({
  left: 0,
  top: 0,
  data: {
    path: "",
    name: "",
    label: ""
  },
  show: false,
  index: 0
})

// 设置本地tags
const setLocalTags = () => {
  localStorage.setItem("tagsList", JSON.stringify(tagsList.value))
}

watch(
  () => route,
  newVal => {
    if (!tagsList.value.find(v => v.name === newVal.name)) {
      tagsList.value.push({
        path: newVal.path,
        name: newVal.name as string,
        label: newVal.meta.title as string
      })
    }
    activeTab.value = String(newVal.name)
    activeTabIndex = tagsList.value.findIndex(v => v.name === activeTab.value)
    setLocalTags()
  },
  { deep: true, immediate: true }
)

const handleTag = (item: TabsPaneContext) => {
  const index = Number(item.index)
  const currentTag = tagsList.value[index]
  activeTabIndex = index
  router.push(currentTag.path)
}

const removeTag = (item: TabPaneName) => {
  const index = tagsList.value.findIndex(v => v.name === item)
  // 如果删除自身
  if (index === activeTabIndex) {
    tagsList.value.splice(index, 1)
    let newTag: Tag = { path: "", label: "", name: "" }
    if (tagsList.value[index - 1]) {
      newTag = tagsList.value[index - 1]
      activeTabIndex = index - 1
    } else {
      newTag = tagsList.value[0]
      activeTabIndex = 0
    }
    activeTab.value = newTag.name
    router.replace(newTag.path)
  } else {
    tagsList.value.splice(index, 1)
  }
  setLocalTags()
}

const contextmenu = (e: any) => {
  // 如果右击的是tab才继续
  const classList = Array.from(e.target?.classList)
  if (classList.includes("el-tabs__item")) {
    e.preventDefault()
    const parent = e.target.parentElement
    if (parent) {
      const siblings = Array.from(parent.children)
      const index = siblings.indexOf(e.target)
      const currentTag = tagsList.value[index]
      popoverData.value = {
        left: e.clientX,
        top: e.clientY,
        data: currentTag,
        show: true,
        index
      }
    }
  }
}

// 关闭其他
const closeOther = () => {
  const index = popoverData.value.index
  tagsList.value = tagsList.value.filter((_, i) => i === index)
  // 如果点击的不是自身
  if (index !== activeTabIndex) {
    const lastTab = tagsList.value[0]
    activeTab.value = lastTab.name
    activeTabIndex = 0
    router.replace(lastTab.path)
  }
  setLocalTags()
}

// 关闭右侧
const closeRight = () => {
  tagsList.value.splice(popoverData.value.index + 1)
  // 如果点击的不是自身
  if (popoverData.value.index !== activeTabIndex) {
    const lastTabIndex = tagsList.value.length - 1
    const lastTab = tagsList.value[lastTabIndex]
    activeTab.value = lastTab.name
    activeTabIndex = lastTabIndex
    router.replace(lastTab.path)
  }
  setLocalTags()
}

// 刷新
const refresh = () => {
  location.reload()
}

onMounted(() => {
  window.addEventListener("click", () => {
    popoverData.value.show = false
  })
})
</script>

<style scoped lang="scss">
.popover-ul {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  font-size: 12px;
  color: #606266;
  background: #fff;
  padding: 5px 0;
  border-radius: 4px;
  box-shadow:
    0px 12px 32px 4px rgba(0, 0, 0, 0.04),
    0px 8px 20px rgba(0, 0, 0, 0.08);

  li {
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      color: #303133;
      background: #f0f2f5;
    }
  }
}

.router-tag-box {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  padding: 0 15px;

  :deep(.el-tabs) {
    --el-tabs-header-height: 30px;
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
  :deep(.el-tabs--card > .el-tabs__header) {
    border-bottom: none;
  }
  :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
    border-bottom: 1px solid var(--el-border-color-light);
    border-radius: 2px;
  }
  :deep(.el-tabs__item) {
    padding: 0 10px;
  }
  :deep(
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable
  ) {
    padding: 0 10px;
  }
  $line-height: 35px;
  :deep(.el-tabs__nav-prev) {
    line-height: $line-height;
  }
  :deep(.el-tabs__nav-next) {
    line-height: $line-height;
  }
}
</style>
