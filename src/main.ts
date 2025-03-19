import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "./styles/index.scss"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import "./permission"
import components from "@/components" // 全局组件注册
import "epic-designer/dist/style.css"
import { setupElementPlus } from "epic-designer/dist/ui/elementPlus"

setupElementPlus()

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(components)
app.mount("#app")
