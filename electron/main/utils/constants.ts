import pkg from '../../../package.json'
/**app名称 */
export const APP_NAME = pkg.name

/**
 * 数据库配置
 */
export const DB_CONFIG = {
    dbFileName:'autoLite.db',
    timeout:30 * 1000
}