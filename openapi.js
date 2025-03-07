import { generateService } from "@umijs/openapi"
import path from "path" // 改为 ESM 方式引入
import { fileURLToPath } from "url" // 新增：用于替代 __dirname

// 获取当前文件路径（替代 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

generateService({
  schemaPath: path.resolve(__dirname, "openapi.json"), // 现在可以正确解析路径
  serversPath: "./src",
  projectName: "api",
  requestLibPath: "import { request } from '@/utils/request';",
  dataFields: ["data"],
  hook: {
    customFunctionName: data => {
      return data.summary
    }
  }
})
