import NProgress from "nprogress"
import "nprogress/nprogress.css"
import router from "./router"
import {
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type NavigationGuardNext
} from "vue-router"
import { getToken } from "./utils/auth"
import useStore from "./store"
import { ElMessage } from "element-plus"
import dynamicRouter from "./router/dynamicRouter"
import { getPageTitle } from "@/config"

// 未登录白名单
const notLoginWhiteList = ["/login"]

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
  ) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)

    const token = getToken()
    const { setMenuData, store } = useStore()

    if (token) {
      if (to.path === "/login") {
        next({ path: "/" })
      } else {
        // 已经鉴权-直接放行
        if (store.auth) {
          next()
        } else {
          try {
            await setMenuData(dynamicRouter)
            next({ ...to, replace: true })
          } catch (error) {
            ElMessage.error("出现错误,访问失败,请重新登录")
          }
        }
      }
    } else {
      if (notLoginWhiteList.includes(to.path)) {
        next()
      } else {
        next({ path: "/login" })
      }
    }
  }
)

router.afterEach(() => {
  NProgress.done()
})
