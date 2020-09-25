const Sequelize = require("sequelize");

const conexao = new Sequelize("catalogomusicasbd", "postgres", "ti@123", {
  host: "localhost",
  dialect: "postgres",
  timezone: "-03:00",
});

module.exports = conexao;
