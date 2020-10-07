const express = require('express');
const autorizacao = require("./autorizacao/autorizacao");

const LoginControlador = require('./controladores/LoginControlador');
const UsuariosControlador = require('./controladores/UsuariosControlador');
const MusicasControlador = require('./controladores/MusicasControlador');
const GenerosControlador = require('./controladores/GenerosControlador');
const ArtistasControlador = require('./controladores/ArtistasControlador');
const Generos = require('./bd/Generos');

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

rotas.get("/musicas/listar/:mensagem?", autorizacao, MusicasControlador.listar);
rotas.get("/musicas/novo/:mensagem?", autorizacao, MusicasControlador.novo);
rotas.post("/musicas/salvar", MusicasControlador.salvar);
rotas.get("/musicas/excluir/:id", autorizacao, MusicasControlador.excluir);
rotas.get("/musicas/editar/:id/:erro?", autorizacao, MusicasControlador.editar);
rotas.post("/musicas/atualizar", MusicasControlador.atualizar);

// ---------- Gêneros ----------
rotas.get("/generos/listar/:mensagem?", autorizacao, GenerosControlador.listar);
rotas.get("/generos/novo/:mensagem?", autorizacao,  GenerosControlador.novo);
rotas.post("/generos/salvar", GenerosControlador.salvar);
rotas.get("/generos/editar/:id/:erro?", autorizacao, GenerosControlador.editar);
rotas.post("/generos/atualizar", GenerosControlador.atualizar);
rotas.get("/generos/excluir/:id", autorizacao, GenerosControlador.excluir);

// ---------- Artistas ----------
rotas.get("/artistas/listar/:mensagem?", autorizacao, ArtistasControlador.listar);
rotas.get("/artistas/novo/:mensagem?", autorizacao, ArtistasControlador.novo);
rotas.post("/artistas/salvar", ArtistasControlador.salvar);
rotas.get("/artistas/editar/:id/:erro?", autorizacao, ArtistasControlador.editar);
rotas.post("/artistas/atualizar", ArtistasControlador.atualizar);
rotas.get("/artistas/excluir/:id", autorizacao, ArtistasControlador.excluir);


module.exports = rotas;