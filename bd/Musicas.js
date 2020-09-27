const Sequelize = require("sequelize");
const conexao = require("./conexao");
const Usuarios = require("./Usuarios");
const Genero = require("./Genero");
const Artista = require("./Artistas");
const Artistas = require("./Artistas");

const Musicas = conexao.define("musicas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: Sequelize.STRING,
  ano: Sequelize.INTEGER,
});
Musicas.belongsTo(Artistas);
Musicas.sync({ force: false });

module.exports = Musicas;
