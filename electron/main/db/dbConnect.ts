import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { existsSync, mkdirSync } from 'fs'
import path, { dirname } from 'path'
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'
import { APP_NAME, DB_CONFIG } from '../utils/constants'
import { getAppHand, getDirname } from '../utils'
const __dirname = getDirname(import.meta.url)
const DB_PATH = path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName)
const sqlite = new Database(DB_PATH, {
  timeout: DB_CONFIG.timeout
})

export let db: BetterSQLite3Database<typeof schema>;
/**
 * 连接数据库
 */
export const dbConnect = async () => {
  // 校验数据库目录是否存在
  generateDbPath(DB_PATH)
  db = drizzle(sqlite, { schema })
  // 仅在生成环境中使用迁移流程(打包自动生成升级文件)，开发环境使用 npm run syncSchema 直接同步数据库
  if (process.env.NODE_ENV === 'production') {
    await migrate(db, { migrationsFolder: path.join(__dirname, '../../../migrations') })
  }
}

/**
 * 生成数据库文件夹
 */
const generateDbPath = (dirString:string) => {
  try {
    const dir = dirname(dirString)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}
