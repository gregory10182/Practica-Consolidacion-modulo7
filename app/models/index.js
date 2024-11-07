import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import userModel from "./user.model.js";
import bootcampModel from "./bootcamp.model.js";

db.users = userModel(sequelize, Sequelize);
db.bootcamps = bootcampModel(sequelize, Sequelize);

db.users.belongsToMany(db.bootcamps, {
  through: "user_bootcamp",
  as: "bootcamps",
  foreignKey: "user_id",
});
db.bootcamps.belongsToMany(db.users, {
  through: "user_bootcamp",
  as: "users",
  foreignKey: "bootcamp_id",
});

export default db;
