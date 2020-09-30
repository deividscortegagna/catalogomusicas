const Sequelize = require("sequelize");
const conexao = require("./conexao");
const Usuarios = require("./Usuarios");
const Genero = require("./Generos");
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

Genero.hasMany(Musicas, {
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Musicas.belongsTo(Genero);

Artistas.hasMany(Musicas, {
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Musicas.belongsTo(Artistas);

Usuarios.hasMany(Musicas, {
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Musicas.belongsTo(Usuarios);


Musicas.sync({ force: false });

module.exports = Musicas;