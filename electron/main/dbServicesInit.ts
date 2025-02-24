import { initUserIpc } from "./router/user";
import { dbInit } from "./db/dbInit";
export const mainInitHand = async () => {
  // 调用dbInit函数，初始化数据库
  await dbInit()
  // 调用initUserIpc函数，初始化用户进程
  await initUserIpc()
};
