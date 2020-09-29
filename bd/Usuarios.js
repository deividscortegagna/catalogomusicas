const Sequelize = require("sequelize");
const conexao = require("./conexao");

const Usuarios = conexao.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: Sequelize.STRING,
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: Sequelize.STRING,
});

Usuarios.sync({ force: false });

module.exports = Usuarios;
