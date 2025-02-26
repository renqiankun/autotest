import { queryDB } from './modules/db'
import fs from 'node:fs'
import { contextBridge } from 'electron'
contextBridge.exposeInMainWorld('electronAPI', {
  queryDB: queryDB,
  fs: fs
})
