import { dbConnectionHand } from "./db/dbInit";
import { initUserIpc } from "./router/user";

export const mainInitHand = async () => {
  await dbConnectionHand();
  await initUserIpc()
};
