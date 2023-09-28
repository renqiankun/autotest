import { userDao } from "../dao/user";

export class userServices {
  static async addUser(user:any) {
    let res = await userDao.getInstance().insertUser(user);
    return res;
  }
  static async updateUser({ id, name, nickName }:any) {
    console.log(userDao.getInstance().update)
    // let res = await userDao.getInstance().insertUser(user);
    // return res;
    return userDao.getInstance()
  }
}
