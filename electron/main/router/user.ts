import { ipcMain } from 'electron'
import { userController } from '../db/controller/user'

ipcMain.handle('db/user/getList', async (event, arg) => {
  const res = await userController.getList()
  return res
})
