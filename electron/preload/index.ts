import { queryDB } from './modules/db'
import { fsProxy } from './modules/fs'
import { contextBridge } from 'electron'
contextBridge.exposeInMainWorld('electronAPI', {
  queryDB: queryDB,
  fs: fsProxy
})
