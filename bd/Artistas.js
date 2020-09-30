const Sequelize = require("sequelize");
const conexao = require("./conexao");

const Artistas = conexao.define("artistas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: Sequelize.STRING,
  site: Sequelize.STRING,
});
Artistas.sync({ force: false });

module.exports = Artistas;