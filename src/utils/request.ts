import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
  type Canceler
} from "axios"
import { ElMessage } from "element-plus"
import { getToken } from "./auth"

interface BizResponse<T = any> {
  code: number
  data: T
  message: string
}

const cancelTokenMap = new Map<string, Canceler>()

const request: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
})

/**
 * 生成请求的唯一标识（key），包含 method、url、params 和 data
 */
const getRequestKey = (config: AxiosRequestConfig): string => {
  return `${config.method}_${config.url}_${JSON.stringify(config.params)}_${JSON.stringify(config.data)}`
}

// 请求拦截器
request.interceptors.request.use(
  config => {
    config.headers = config.headers || {}

    // 如果没有 Authorization，则自动添加
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${getToken() || ""}`
    }

    // 生成请求唯一标识
    const requestKey = getRequestKey(config)

    // 自动取消完全相同的请求
    if (cancelTokenMap.has(requestKey)) {
      cancelTokenMap.get(requestKey)?.("自动取消重复请求")
    }

    // 创建 CancelToken 并保存取消函数
    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    cancelTokenMap.set(requestKey, source.cancel)

    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<BizResponse>) => {
    // 请求成功后清除对应的取消函数
    const requestKey = getRequestKey(response.config)
    cancelTokenMap.delete(requestKey)

    // 对 blob 类型直接返回数据
    if (response.config.responseType === "blob") {
      return response.data
    }

    const resData = response.data
    if (resData.code !== 200) {
      const errorMsg = resData.message || `业务错误[${resData.code}]`
      ElMessage.error(errorMsg)
      return Promise.reject(new Error(errorMsg))
    }
    return resData.data
  },
  error => {
    // 出错时同样清除取消函数
    if (error.config) {
      const requestKey = getRequestKey(error.config)
      cancelTokenMap.delete(requestKey)
    }

    // 如果请求已被取消，直接返回拒绝
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    let errorMessage = "请求异常"
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = "身份验证失败，请重新登录"
          // TODO:退出登录
          break
        case 403:
          errorMessage = "没有操作权限"
          break
        case 404:
          errorMessage = "请求地址不存在"
          break
        case 500:
          errorMessage = "服务器错误，请联系管理员"
          break
        default:
          errorMessage =
            error.response.data?.message || `网络错误[${error.response.status}]`
      }
    } else if (error.request) {
      errorMessage = "网络连接异常，请检查网络"
    }

    ElMessage.error(errorMessage)
    return Promise.reject(error)
  }
)

/**
 * 根据方法和 URL 批量取消请求
 */
function cancelRequestByMethodAndUrl(
  method: string,
  url: string,
  message: string = "手动取消请求"
): void {
  const prefix = `${method.toLowerCase()}_${url}`
  cancelTokenMap.forEach((cancel, key) => {
    if (key.startsWith(prefix)) {
      cancel(message)
      cancelTokenMap.delete(key)
    }
  })
}

/**
 * 取消所有未完成的请求
 */
function cancelAllRequests(message: string = "取消所有请求"): void {
  cancelTokenMap.forEach(cancel => cancel(message))
  cancelTokenMap.clear()
}

// 监听页面刷新事件，取消所有请求
window.addEventListener("beforeunload", () => {
  cancelAllRequests("页面刷新取消请求")
})

export { request, cancelRequestByMethodAndUrl, cancelAllRequests }
