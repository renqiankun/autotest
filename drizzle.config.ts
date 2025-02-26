import { defineConfig } from 'drizzle-kit'
import path from 'path'

import {APP_NAME, DB_CONFIG} from './electron/main/utils/constants'
// 需要确认databasePath 是否指向正确的数据库文件
const databasePath = path.join( process.env.APPDATA ?? '', APP_NAME, DB_CONFIG.dbFileName);
// console.log('databasePath', databasePath);
export default defineConfig({
  dialect: 'sqlite', // "mysql" | "sqlite" | "postgresql" | "turso" | "singlestore"
  schema: './electron/main/db/schema/index.ts',
  out: './migrations',
  dbCredentials: {
    url: databasePath,
  },
})
