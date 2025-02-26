import { queryDB } from './modules/db'
import { fsProxy } from './modules/fs'
import { contextBridge } from 'electron'
/**
 * 抛出window.electronAPI
 */
contextBridge.exposeInMainWorld('electronAPI', {
  queryDB: queryDB,
  fs: fsProxy
})
