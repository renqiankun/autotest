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


/**
 * 新增或修改用户
 * @returns 
 */
export const addOrUpdateUserDB = async (data:any) => {
  return window.electronAPI.queryDB({
    path: 'db/user/addOrUpdate',
    params:data
  })
}


/**
 * 获取用户详情
 * @returns 
 */
export const getUserInfoByIdDB = async (data:any) => {
  return window.electronAPI.queryDB({
    path: 'db/user/getInfoById',
    params:data
  })
}



/**
 * 删除
 * @returns 
 */
export const deleteUserByIdDB = async (data:{id:number}) => {
  return window.electronAPI.queryDB({
    path: 'db/user/deleteById',
    params:data
  })
}
