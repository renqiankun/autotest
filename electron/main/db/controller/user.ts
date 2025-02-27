import { users } from '../schema'
import { userServices } from '../services/user'
export class userController {
  /**
   * 更新或新增用户
   */
  static async addOrUpdate(data: any) {
    let res
    if (data.id) {
      res = await userServices.updateUserById(data.id, data)
    } else {
      const newData = {...data}
      delete newData.id
      res = await userServices.insertUser(newData)
    }
    return res
  }
    /**
   * 根据用户id获取详情
   */
    static async getInfoById({id}) {
      return await userServices.getUserById(id)
    }
  /**
   * 获取用户列表
   * @returns
   */

  static async getList() {
    return await userServices.getUserList()
  }
  /**
   * 根据id删除用户
   */
  static async deleteById({id}) {
    return await userServices.deleteUserById(id)
  }
}
