const Sequelize = require("sequelize");

const conexao = new Sequelize(
  "catalogomusicasbd",
  "postgres",
  "lipetriches96",
  {
    host: "localhost",
    dialect: "postgres",
    timezone: "-03:00",
  }
);

module.exports = conexao;
// ti@123
