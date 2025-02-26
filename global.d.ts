/**
 * 数据库查询参数
 */
interface QueryDBType {
  /**请求路径即ipcMain监听路径 */
  path: string
  params?: Record<string, any>
  timeout?: number
}

/**
 * renderer注入electron
 */
declare interface Window {
  electronAPI: {
    queryDB: <T>(params:QueryDBType) => Promise<T>,
    fs:<T>() => T
  }
}
