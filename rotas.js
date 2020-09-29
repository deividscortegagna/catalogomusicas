const express = require('express');
const autorizacao = require("./autorizacao/autorizacao");

const LoginControlador = require('./controladores/LoginControlador');
const UsuariosControlador = require('./controladores/UsuariosControlador');
const MusicasControlador = require('./controladores/MusicasControlador');
const Musicas = require('./bd/Musicas');

const rotas = express.Router();

// ---------- Login ----------
rotas.get('/', LoginControlador.index);
rotas.get('/home', autorizacao, LoginControlador.home);
rotas.post('/login', LoginControlador.login);
rotas.get('/logout', LoginControlador.logout);

// ---------- Usuários ----------
rotas.get("/usuarios/novo", UsuariosControlador.novo);
rotas.post("/usuarios/salvar", UsuariosControlador.salvar);

// ---------- Músicas ----------

rotas.get("/musicas/lista/:mensagem?", autorizacao, MusicasControlador.listar);

module.exports = rotas;