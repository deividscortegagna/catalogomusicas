const Sequelize = require("sequelize");
const conexao = require("./conexao");

const Generos = conexao.define("generos", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: Sequelize.STRING,
});

Generos.sync({ force: false });

module.exports = Generos;
