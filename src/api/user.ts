/**
 * 获取用户列表
 * @returns 
 */
export const getUserListDb = async () => {
  return window.electronAPI.queryDB({
    path: 'db/user/getList',
    params:{}
  })
}
