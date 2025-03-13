import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import type { App } from "vue"
import BaseTable from "./common/BaseTable/index.vue"
import BasePage from "./common/BasePage/index.vue"
import BasePaging from "./common/BasePaging/index.vue"

const componentsList: Record<string, any> = {
  BaseTable,
  BasePage,
  BasePaging
}

const components = {
  install: function (Vue: App) {
    // 注册所有element-plus/icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      Vue.component(key, component)
    }
    // 注册所有自定义组件
    Object.keys(componentsList).forEach(key => {
      Vue.component(key, componentsList[key])
    })
  }
}

export default components
