/** * 抛出数据库查询函数 */
import { DB_CONFIG } from '../../main/utils/constants'
// const { ipcRenderer } = require('electron')
import { ipcRenderer } from 'electron'

export interface QueryDBType {
  /**请求路径即ipcMain监听路径 */
  path: string
  params?: Record<string, any>
  timeout?: number
}
/**
 * 查询数据库
 * @param query path string
 * @param query params any
 * @returns
 */
export const queryDB = async (query: QueryDBType) => {
  const config = {
    timeout: DB_CONFIG.timeout,
    ...query
  }
  const path = config.path
  // 开始查询数据库
  const renderRquest = ipcRenderer.invoke(config.path, config.params)

  // 开始计时超时
  let timer: any = null
  const timeoutHand = new Promise(resolve => {
    timer = setTimeout(() => {
      resolve({ code: 500, msg: '服务连接超时' })
    }, config.timeout)
  })

  const requestResult = Promise.race([renderRquest, timeoutHand])
  try {
    const res = await requestResult
    return res
  } catch (error) {
    console.warn(
      `render channel ${path} timeout, arg:${JSON.stringify(
        config.params
      )}, error :${error}`
    )
  } finally {
    clearTimeout(timer)
  }
}
