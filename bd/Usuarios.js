const Sequelize = require('sequelize');
const conexao = require('./conexao');
const Genero = require('./Genero');
const Musicas = require('./Musicas');
const Artista = require('./Artistas');

const Usuarios = conexao.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: Sequelize.STRING,
    login: Sequelize.STRING,
    senha: Sequelize.STRING
});

Usuarios.sync({force: false});

module.exports = Usuarios;