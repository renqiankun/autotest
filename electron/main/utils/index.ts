import { app } from "electron";
// 获取app目录
export const getAppHand = () => {
  return app.getPath("appData");
};
