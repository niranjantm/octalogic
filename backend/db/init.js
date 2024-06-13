import { development } from "./config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(development);

export default sequelize;