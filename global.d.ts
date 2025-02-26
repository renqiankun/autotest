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
 * fs文件代理
 */
interface fsProxy {
  readFile: typeof fs.readFile
  writeFile: typeof fs.writeFile
  appendFile: typeof fs.appendFile
  mkdir: typeof fs.mkdir
  readdir: typeof fs.readdir
  stat: typeof fs.stat
  rmdir: typeof fs.rmdir
  rename: typeof fs.rename
  copyFile: typeof fs.copyFile
  access: typeof fs.access
  chmod: typeof fs.chmod
  chown: typeof fs.chown
  fstat: typeof fs.fstat
}

/**
 * renderer注入electron
 */
declare interface Window {
  electronAPI: {
    queryDB: <T>(params: QueryDBType) => Promise<T>
    fs: fsProxy
  }
}
