import { defineConfig } from 'drizzle-kit'
import path from 'path'

import {APP_NAME, DB_CONFIG} from './electron/main/utils/constants'
const databasePath = path.join( process.env.APPDATA ?? '', APP_NAME, DB_CONFIG.dbFileName);
export default defineConfig({
  dialect: 'sqlite', // "mysql" | "sqlite" | "postgresql" | "turso" | "singlestore"
  schema: './electron/main/db/schema/index.ts',
  out: './migrations',
  dbCredentials: {
    url: databasePath,
  },
})
