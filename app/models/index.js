const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: dbConfig.pool
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize



db.users = require('./user.model.js')(sequelize, Sequelize)
db.bootcamps = require('./bootcamp.model.js')(sequelize, Sequelize)

db.users.belongsToMany(db.bootcamps, {
  through: "user_bootcamp",
  as: 'bootcamps',
  foreignKey: "user_id"
})

db.bootcamps.belongsToMany(db.users, {
  through: "user_bootcamp",
  as: 'users',
  foreingKey: 'bootcamp_id',
})

module.exports = db