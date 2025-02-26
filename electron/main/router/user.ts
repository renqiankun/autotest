import { ipcMain } from "electron";
import { userController } from "../db/controller/user";

export const initUserIpc = () => {
  ipcMain.handle("user-addOrUpdate", async (event, arg) => {
    let res = await userController.addOrUpdate(arg)
    event.sender.send
  });
};
