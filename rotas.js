const express = require('express');
const autorizacao = require("./autorizacao/autorizacao");

const LoginControlador = require('./controladores/LoginControlador');
const UsuariosControlador = require('./controladores/UsuariosControlador');

const rotas = express.Router();

// ---------- Login ----------
rotas.get('/', LoginControlador.index);
rotas.get('/home', autorizacao, LoginControlador.home);
rotas.post('/login', LoginControlador.login);
rotas.get('/logout', LoginControlador.logout);

// ---------- Usuários ----------
rotas.get("/usuarios/novo", UsuariosControlador.novo);
rotas.post("/usuarios/salvar", UsuariosControlador.salvar);

module.exports = rotas;