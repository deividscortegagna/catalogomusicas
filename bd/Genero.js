const Sequelize = require('sequelize');
const conexao = require('./conexao');
const Usuarios = require('./Usuarios');
const Musicas = require('./Musicas');
const Artista = require('./Artistas');

const Genero = conexao.define('genero', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: Sequelize.STRING
});
Genero.sync({force: false});

module.exports = Genero;