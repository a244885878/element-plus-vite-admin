<template>
  <div class="router-tag-box">
    <el-tabs
      @tab-click="handleTag"
      @tab-remove="removeTag"
      v-model="activeTab"
      type="card"
      :closable="tagsList.length > 1"
      class="demo-tabs"
    >
      <el-tab-pane
        v-for="item in tagsList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { TabsPaneContext, TabPaneName } from "element-plus"

type Tag = { path: string; name: string; label: string }

const router = useRouter()
const route = useRoute()
const activeTab = ref("")
const localTagsList: Tag[] = JSON.parse(localStorage.getItem("tagsList")!)
const tagsList = ref<Tag[]>(localTagsList || [])

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
    setLocalTags()
  },
  { deep: true, immediate: true }
)

const handleTag = (item: TabsPaneContext) => {
  const currentTag = tagsList.value[Number(item.index)]
  router.push(currentTag.path)
}

const removeTag = (item: TabPaneName) => {
  const index = tagsList.value.findIndex(v => v.name === item)
  // 如果删除自身
  if (activeTab.value === item) {
    tagsList.value.splice(index, 1)
    const newTag = tagsList.value[index - 1] || tagsList.value[0]
    activeTab.value = newTag.name
    router.push(newTag.path)
  } else {
    tagsList.value.splice(index, 1)
  }
  setLocalTags()
}
</script>

<style scoped lang="scss">
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
}
</style>
