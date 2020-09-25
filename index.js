const express = require("express");
const bodyParser = require("body-parser");
const conexao = require("./bd/conexao");
const Sequelize = require("sequelize");
const Usuarios = require("./bd/Usuarios");
const Musicas = require("./bd/Musicas");
const Genero = require("./bd/Genero");
const Artistas = require("./bd/Artistas");
const formataData = require("./public/js/util");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

conexao.authenticate();

app.get("/", function (req, res) {
  res.render("login", { mensagem: "" });
});
app.get("/index", function (req, res) {
  res.render("index");
});

app.post("/login", function (req, res) {
  Usuarios.findOne({ where: { login: req.body.login } }).then(function (
    usuario
  ) {
    if (usuario != undefined) {
      if (usuario.senha == req.body.senha) {
        res.redirect("/index");
      } else res.render("login", { mensagem: "Usuário ou senha inválidos" });
    } else res.render("login", { mensagem: "Usuário ou senha inválidos" });
  });
});

app.get("/usuarios/novo", function (req, res) {
  res.render("usuarios");
});
app.get("/usuarios/cancelar", function (req, res) {
  res.render("login", { mensagem: "" });
});
app.post("/usuarios/salvar", function (req, res) {
  let nome = req.body.nome;
  let email = req.body.login;
  let senha = req.body.senha;
  Usuarios.create({ nome: nome, login: email, senha: senha }).then(
    res.render("login", { mensagem: "Usuario Cadastrado." })
  );
});

app.listen(3000);
