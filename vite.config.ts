// @ts-ignore
import eslint from "vite-plugin-eslint"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import monacoEditorPlugin from "vite-plugin-monaco-editor"

export default defineConfig({
  plugins: [
    vue(),
    eslint({
      failOnError: true, // 关键配置：错误阻断构建
      fix: true, // 自动修复可修复问题
      include: ["src/**/*.js", "src/**/*.ts", "src/**/*.vue"] // 指定校验范围
    }),
    (monacoEditorPlugin as any).default({
      languageWorkers: ["editorWorkerService", "json"]
    })
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8000
  }
})
