const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("corkboardit", "kraneabel", "password1", {
  host: "localhost",
  dialect: "mssql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

module.exports = {
  sequelize,
};
