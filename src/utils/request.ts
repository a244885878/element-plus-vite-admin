import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 10000
})

export default {
  get: (url: string, params?: object) => instance.get(url, { params }),
  post: (url: string, data?: object) => instance.post(url, data)
}
