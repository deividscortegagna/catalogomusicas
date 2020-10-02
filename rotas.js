const express = require('express');
const autorizacao = require("./autorizacao/autorizacao");

const LoginControlador = require('./controladores/LoginControlador');
const UsuariosControlador = require('./controladores/UsuariosControlador');
const MusicasControlador = require('./controladores/MusicasControlador');
const GenerosControlador = require('./controladores/GenerosControlador');

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
rotas.get("/musicas/novo/:mensagem?", autorizacao, MusicasControlador.novo);
rotas.post("/musicas/salvar", MusicasControlador.salvar);
rotas.get("/musicas/excluir/:id", autorizacao, MusicasControlador.excluir);
rotas.get("/musicas/editar/:id/:erro?", autorizacao, MusicasControlador.editar);
rotas.post("/musicas/atualizar", MusicasControlador.atualizar);

// ---------- Gêneros ----------
rotas.get("/generos/excluir/:id", autorizacao, GenerosControlador.excluir);

module.exports = rotas;