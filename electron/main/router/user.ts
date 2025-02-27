import { ipcMain } from 'electron'
import { userController } from '../db/controller/user'

/**
 * 获取用户列表
 */
ipcMain.handle('db/user/getList', async (event, arg) => {
  const res = await userController.getList()
  return res
})
/**
 * 新增或更新用户
 */
ipcMain.handle('db/user/addOrUpdate', async (event, arg) => {
  const res = await userController.addOrUpdate(arg)
  return res
})

/**
 * 根据用户id获取用户信息
 */
ipcMain.handle('db/user/getInfoById', async (event, arg) => {
  const res = await userController.getInfoById(arg)
  return res
})

/**
 * 根据用户id删除
 */
ipcMain.handle('db/user/deleteById', async (event, arg) => {
  const res = await userController.deleteById(arg)
  return res
})

