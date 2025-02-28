import { app, ipcMain } from 'electron'
import log from 'electron-log'
import path from 'path'
import { APP_NAME } from '../utils/constants'
import { isProd } from '../utils'

/**
 * 支持下列日志等级
 * error,
 * warn,
 * info,
 * verbose,
 * debug,
 * silly
 */

log.transports.file.resolvePathFn = () =>
  path.join(app.getPath('appData'), APP_NAME, 'log', 'main.log')

const date = new Date()
const dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// 修改日志文件名
log.transports.file.fileName = dateStr + '.log'
// 修改日志格式
log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}][{processType}][{level}]{scope} {text}'

// 设置日志文件大小上限, 达到上限后备份文件并重命名未**.old.log,有且仅有一个备份文件
log.transports.file.maxSize = 10 * 1024 * 1024

// 打包后禁用console输出
if (isProd) {
  log.transports.console.level = false
}
export default log
