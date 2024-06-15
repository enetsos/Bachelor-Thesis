import { Sequelize } from "sequelize-typescript";
import EnvManager from "../EnvManager";
import dotev from "dotenv";

dotev.config();

const sequelize = new Sequelize({
    database: EnvManager.getDbName(),
    dialect: "mysql",
    username: EnvManager.getDbUsername(),
    password: EnvManager.getDbPassword(),
    host: EnvManager.getDbHost(),
    port: EnvManager.getDbPort(),
    models: [__dirname + "/models"],
});



export default sequelize;