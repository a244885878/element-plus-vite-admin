/**
 * @description 工具方法
 */

/**
 * @description 金额格式化函数
 * @param amount 传入的金额
 * @returns 格式化后的字符串
 */
export const formatAmount = (amount: number | string): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatter.format(parseFloat(String(amount)))
}

/**
 * @description:随机函数
 * @param min {number} 最小值
 * @param max {number} 最大值
 * @return value {number} 返回的随机值
 */
export const random = (min: number, max: number): number => {
  const result = Math.random() * (max - min + 1) + min
  return parseInt(String(result))
}

/**
 * @description:节流函数
 * @param fn {function} 回调函数
 * @param delay {number} 延迟时间
 */
export const throttle = (fn: Function, delay: number) => {
  let flag = true
  return () => {
    if (!flag) return
    flag = false
    fn()
    const timer = setTimeout(() => {
      flag = true
      clearTimeout(timer)
    }, delay)
  }
}

/**
 * @description:防抖函数
 * @param fn {function} 回调函数
 * @param delay {number} 延迟时间
 */
export const debounce = (fn: any, delay: number) => {
  let timer: any = null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

// 生成 uuid
export function getUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

interface ObjInterface {
  [key: string]: any // 字段扩展声明
}
/**
 * @description 合并表格行
 * @export
 * @param {object[]} data 表格数据
 * @param {string} rowName 合并行的name
 * @param {string} otherRowName 合并其他行
 * @return {*}
 */
export function tableRowMerge(data: ObjInterface[], rowName: string) {
  const idArray = [] as number[]
  let idPos = 0
  for (let i = 0; i < data.length; i++) {
    // 如果当 i == 0 说明数据是第一行, 需要重新赋值
    if (i == 0) {
      // idArray.push(1) 说明这一行数据被显示出来
      idArray.push(1)
      // idPos = 0 重置当前的计数器
      idPos = 0
    }
    // 说明不是从第一行开始遍历的
    else {
      // 判断当前的指定数据是否和之前的指定数据值相同
      if (data[i][rowName] == data[i - 1][rowName]) {
        // 如果相同就需要将 idArray 的数据自加
        idArray[idPos] += 1
        // 同时需要将 idArray push一个0 表示下一行不用显示
        idArray.push(0)
      }
      // 说明 当前的数据和上一行的指定数据不同
      else {
        // idArray.push(1) 说明当前一行的数据需要显示
        idArray.push(1)
        // 重新给计数器赋值
        idPos = i
      }
    }
  }
  return idArray
}

// 获取文件后缀名
export function getFileExtension(filename: string): string {
  // 使用lastIndexOf来找到最后一个点的位置
  const index = filename.lastIndexOf(".")
  // 如果没有找到点，或者点是文件名的第一个字符，则返回空字符串
  if (index < 1) return ""
  // 返回点之后的所有字符作为后缀名
  return filename.substring(index + 1)
}

// 下载blob文件
export function downloadBlob(blob: Blob, fileName: string) {
  // 创建一个隐藏的a标签
  const a = document.createElement("a")
  a.style.display = "none"
  // 利用URL.createObjectURL()方法为Blob对象创建一个临时URL
  const url = URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  // 将a标签添加到文档中，并模拟点击进行下载
  document.body.appendChild(a)
  a.click()
  // 下载完成后，清理并移除临时URL和a标签
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 下载url文件
export function downloadFile(url: string, filename: string) {
  const a = document.createElement("a")
  a.style.display = "none"
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// 获取当前年月
export function getCurrentTime(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  return `${year}-${month}`
}

// 判断是否是当天
export function isToday(dateString: string): boolean {
  const today = new Date()
  const checkDate = new Date(dateString)

  return (
    today.getFullYear() === checkDate.getFullYear() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getDate() === checkDate.getDate()
  )
}

// 判空
export const judgeNull = (val: any) => {
  if (val === null || val === undefined || val === "" || val === "[]") {
    return true
  }
  return false
}

// 静态图片转换
export const returnImgUrl = (img: string) => {
  return new URL(`/src/assets/images/${img}`, import.meta.url).href
}
