import pkg from '../../../package.json'
/**app名称 */
export const APP_NAME = pkg.name
/**
 * 数据库名称
 */

const DB_NAME = process.env.NODE_ENV === 'development' ? 'autoLite.dev.db' : 'autoLite.db'
/**
 * 数据库配置
 */
export const DB_CONFIG = {
    dbFileName: DB_NAME,
    timeout:30 * 1000
}