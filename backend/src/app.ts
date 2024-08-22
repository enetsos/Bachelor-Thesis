import EnvManager from "./EnvManager";
import { createServer } from "./server";
import sequelize from "./db/connection";
import dotenv from "dotenv";
import 'reflect-metadata';


dotenv.config();

const server = createServer();


const port = EnvManager.getPort(3001);

sequelize.sync({ alter: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start the server:", error);
  });

