import { userServices } from "../services/user";
export class userController {
  static async addOrUpdate({ id, userName, nickName }:any) {
    let tick = id ? userServices.updateUser : userServices.addUser;
    let res = await tick({ id, userName, nickName });
    return res
  }
}
