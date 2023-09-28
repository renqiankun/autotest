import "reflect-metadata"
import { DataSource } from "typeorm";
import { DB_CONFIG, APP_NAME } from "../../utils/constants";
import { getAppHand } from "../../utils";
import path from "path";
import { User } from "./entity/user";
export let dataSource :DataSource;
export const dbConnectionHand = async () => {
  dataSource = new DataSource({
    // name: DB_CONFIG.connectName,
    type: DB_CONFIG.type,
    // 完整文件路径
    database: path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName),
    logging: false,
    logger: "simple-console",
    synchronize: true,
    entities: [User],
  });
  dataSource.initialize()
};
