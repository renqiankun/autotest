/**
 * 获取用户列表
 * @returns 
 */
export const getUserListDB = async () => {
  return window.electronAPI.queryDB({
    path: 'db/user/getList',
    params:{}
  })
}
