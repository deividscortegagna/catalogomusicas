const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const conexao = require("./bd/conexao");
const Genero = require("./bd/Generos");
const Artistas = require("./bd/Artistas");
const Musicas = require("./bd/Musicas");
const autorizacao = require("./autorizacao/autorizacao");
const rotas = require('./rotas');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(session({ secret: "catalogo", resave: true, saveUninitialized: true }))
// Utilização de um arquivo de rotas para melhor organização.
app.use(rotas);

conexao.authenticate();

app.listen(port, () => {
  console.log(`O servidor está rodando http://localhost:${port}`);
});
