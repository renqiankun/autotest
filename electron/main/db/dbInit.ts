import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import path from 'path'
import { drizzle } from 'drizzle-orm/better-sqlite3'    
import Database from 'better-sqlite3'
import * as schema from './schema'
import { APP_NAME, DB_CONFIG } from '../utils/constants'
import { getAppHand } from '../utils'

const DB_PATH = path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName)
const sqlite = new Database(DB_PATH)
export let db
export const dbInit = async () => {
  db = drizzle(sqlite, { schema })
  // await migrate(db, { migrationsFolder: path.join(__dirname, 'migrations') })
}
