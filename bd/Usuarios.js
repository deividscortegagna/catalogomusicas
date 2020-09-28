const Sequelize = require("sequelize");
const conexao = require("./conexao");
const Genero = require("./Genero");
const Musicas = require("./Musicas");
const Artista = require("./Artistas");

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
  senha: {
    type: Sequelize.STRING,
    validate: {
      len: [6,20],
    }
  }
});

Usuarios.sync({ force: false });

module.exports = Usuarios;
