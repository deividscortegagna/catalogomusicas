const Sequelize = require("sequelize");
const conexao = require("./conexao");

const Genero = conexao.define("genero", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: Sequelize.STRING,
});

Genero.sync({ force: false });

module.exports = Genero;
