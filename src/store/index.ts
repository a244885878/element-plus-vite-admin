import { reactive } from "vue"
import router, { resetRouter } from "@/router"
import { removeToken } from "@/utils/auth"
import _ from "lodash"

export type Menu = {
  path: string
  name: string
  component: string | (() => Promise<unknown>)
  redirect?: string
  meta: {
    hidden?: boolean
    title: string
    icon?: string
  }
  children?: Menu[]
}

// 常驻路由
const constantRoutes = [
  {
    path: "/home",
    name: "home",
    component: "/home/index",
    meta: {
      title: "首页",
      icon: "House"
    }
  }
]

type Store = {
  menuData: Menu[]
  userInfo: any
  auth: boolean
}
const store = reactive<Store>({
  menuData: [],
  userInfo: {
    username: "admin"
  },
  auth: false
})

// 递归过滤菜单
const modules = import.meta.glob("/src/pages/**/*.vue")
const setDynamicViews = (menus: Menu[]) => {
  for (let i = 0; i < menus.length; i++) {
    const v = menus[i]
    if (v.component) {
      v.component = modules[`/src/pages${v.component}.vue`]
    }
    if (v?.children?.length) {
      setDynamicViews(v.children)
    }
  }
  return menus
}

export default function () {
  const setMenuData = async (menu: Menu[]) => {
    store.menuData = setDynamicViews([
      ..._.cloneDeep(constantRoutes),
      ..._.cloneDeep(menu)
    ])
    for (let i = 0; i < store.menuData?.length; i++) {
      const v = store.menuData[i] as any
      router.addRoute("layout", v)
    }
    store.auth = true
  }

  const logout = () => {
    removeToken()
    store.menuData = []
    store.auth = false
    resetRouter()
    // resetTagsView()
    router.push("/login")
  }

  return {
    store,
    setMenuData,
    logout
  }
}
