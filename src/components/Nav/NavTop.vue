<template>
  <div class="nav-top-box">
    <el-icon size="20" color="#303133" class="fold-icon"><Fold /></el-icon>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <template v-for="(item, index) in routeHierarchy" :key="index">
          <el-breadcrumb-item
            :to="{ path: item.path }"
            v-if="index !== routeHierarchy.length - 1"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>{{ item.meta.title }}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
    <div class="nav-handle-box">
      <el-dropdown class="dropdown">
        <div class="dropdown-box">
          <el-avatar :icon="UserFilled" :size="30" />
          <span class="user-name">{{ userInfo?.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, type RouteLocationMatched } from "vue-router"
import { watch, ref } from "vue"
import { UserFilled } from "@element-plus/icons-vue"
import useStore from "@/store"

const {
  store: { userInfo },
  logout
} = useStore()
const route = useRoute()
const routeHierarchy = ref<RouteLocationMatched[]>([])

watch(
  () => route,
  newVal => {
    routeHierarchy.value = newVal.matched.slice(1)
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="scss">
.nav-top-box {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
  align-items: center;

  .fold-icon {
    cursor: pointer;
    margin-right: 15px;
  }

  :deep(.el-breadcrumb__inner.is-link) {
    font-weight: 400;
  }

  :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    color: #a8abb2;
  }

  .nav-handle-box {
    margin-left: auto;
    height: 100%;
    display: flex;
    align-items: center;

    .dropdown {
      cursor: pointer;
      margin-right: 5px;

      .dropdown-box {
        display: flex;
        align-items: center;

        .user-name {
          margin-left: 10px;
          color: #606266;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
