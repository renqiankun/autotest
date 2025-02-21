import { DB_CONFIG, APP_NAME } from '../utils/constants'
import { getAppHand } from '../utils'
import path from 'path'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3';

const sqlite = new Database(path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName))
export let db;
export const dbInit = () => {
  db = drizzle({ client: sqlite });
}