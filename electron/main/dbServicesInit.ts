import { initUserIpc } from "./router/user";
import { dbInit } from "./db/dbInit";
export const mainInitHand = async () => {
  dbInit()
  await initUserIpc()
};
