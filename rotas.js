const express = require('express');

const LoginControlador = require('./controladores/LoginControlador');
const UsuariosControlador = require('./controladores/UsuariosControlador');

const rotas = express.Router();

rotas.get('/', LoginControlador.index);

module.exports = rotas;