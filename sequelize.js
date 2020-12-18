const Sequelize = require("sequelize");
const UsersModel = require("./models/user.model");
const { DATABASE_NAME, USERNAME, PASSWORD, HOST, PORT, DIALECT } = require("./constants");
const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Users = UsersModel(sequelize, Sequelize);

module.exports = {
  Users,
};
