const Sequelize = require("sequelize");
const config = require("../configuracao/bancodados");
const Artistas = require("../modelos/Artistas");
const Generos = require("../modelos/Generos");
const Musicas = require("../modelos/Musicas");
const Usuarios = require("../modelos/Usuarios");

const conexao = new Sequelize(config);

Artistas.init(conexao);
Generos.init(conexao);
Musicas.init(conexao);
Usuarios.init(conexao);

Artistas.associate(conexao.models);
Generos.associate(conexao.models);
Musicas.associate(conexao.models);
Usuarios.associate(conexao.models);

conexao.sync({ force: false });

module.exports = conexao;

