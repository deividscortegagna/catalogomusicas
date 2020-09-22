const express = require('express');
const bodyParser = require('body-parser');
const conexao = require('./bd/conexao');
const Sequelize = require('sequelize');
const Usuarios = require('./bd/Usuarios');
const Musicas = require('./bd/Musicas');
const Genero = require('./bd/Genero');
const Artistas = require('./bd/Artistas');
const formataData = require('./public/js/util');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

conexao.authenticate();

app.get("/", function (req, res) {
    res.render("index");
});
app.listen(3000);