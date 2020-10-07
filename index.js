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

// ---------- Gêneros ----------

app.get("/generos/novo", function (req, res) {
  res.render("generos/novo", { mensagem: "" });
});

app.post("/generos/salvar", function (req, res) {
  let descricao = req.body.descricao;
  Genero.create({ descricao: descricao }).then(
    //create: permite salvar algo no banco de dados
    res.render("generos/novo", { mensagem: "Genero Incluido" })
  );
});

app.get("/generos/editar/:id", function (req, res) {
  let id = req.params.id;
  Genero.findByPk(id).then(function (gen) {
    res.render("generos/editar", { gen: gen });
  });
});

app.post("/generos/atualizar", function (req, res) {
  let id = req.body.id;
  let descricao = req.body.descricao;
  Genero.update({ descricao: descricao }, { where: { id: id } }).then(
    function () {
      res.redirect("/generos");
    }
  );
});

app.listen(port, () => {
  console.log(`O servidor está rodando http://localhost:${port}`);
});
