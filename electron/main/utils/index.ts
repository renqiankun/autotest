import { app } from "electron";
/**
 * 获取用户目录下appdata目录，win下指向C:\Users\用户名\AppData\Roaming
 * @returns string
 */
export const getAppHand = () => {
  return app.getPath("appData");
};
