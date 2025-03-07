import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    name: "layout",
    redirect: "/home",
    children: [],
    meta: {
      static: true // 静态标记、退出登录不会被重置
    }
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      static: true
    },
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "404",
      static: true
    },
    component: () => import("@/views/error/404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 重置动态路由
export const resetRouter = () => {
  router.getRoutes().forEach(route => {
    if (route.name && !route.meta.static) {
      router.removeRoute(route.name)
    }
  })
}

export default router
