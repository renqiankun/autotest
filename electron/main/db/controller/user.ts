import { userServices } from "../services/user";
export class userController {
  static async addOrUpdate({ id, name }:any) {
    const tick = id ? userServices.updateUserById : userServices.insertUser;
    const res = await tick(id,{ id, name });
    return res
  }
}
