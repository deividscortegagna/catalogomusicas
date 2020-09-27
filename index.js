const express = require("express");
const bodyParser = require("body-parser");
const conexao = require("./bd/conexao");
const Sequelize = require("sequelize");
const Usuarios = require("./bd/Usuarios");
const Genero = require("./bd/Genero");
const Artistas = require("./bd/Artistas");
const Musicas = require("./bd/Musicas");
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

// ----------------------------------------------------- Generos-------------------------

// app.get("/generos", function (req, res) {
// res.render("generos/generos");
// });
app.get("/generos", function (req, res) {
  //findAll: retorna todos os registros do banco de dados
  Genero.findAll({ order: ["id"] }).then(function (genero) {
    res.render("generos/generos", { genero: genero });
  });
});

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
// -------------------------------------------------------Artistas-----------------------
app.get("/artistas", function (req, res) {
  //findAll: retorna todos os registros do banco de dados
  Artistas.findAll({ order: ["id"] }).then(function (artistas) {
    res.render("artistas/artistas", { artistas: artistas });
  });
});

app.get("/artistas/novo", function (req, res) {
  res.render("artistas/novo", { mensagem: "" });
});
app.post("/artistas/salvar", function (req, res) {
  let nome = req.body.nome;
  let site = req.body.site;
  Artistas.create({ nome: nome, site: site }).then(
    //create: permite salvar algo no banco de dados, nesse caso categoria
    res.render("artistas/novo", { mensagem: "Artista  Incluido" })
  );
});
app.get("/artistas/editar/:id", function (req, res) {
  let id = req.params.id;
  Artistas.findByPk(id).then(function (artista) {
    res.render("artistas/editar", { artista: artista });
  });
});
app.post("/artistas/atualizar", function (req, res) {
  let id = req.body.id;
  let nome = req.body.nome;
  let site = req.body.site;
  Artistas.update({ nome: nome, site: site }, { where: { id: id } }).then(
    function () {
      res.redirect("/artistas");
    }
  );
});

//-------------------------------------------------Listando Musica-------------------------------------

app.get("/musicas", function (req, res) {
  res.render("musicas/musicas");
});
// app.get("/musicas/novo", function (req, res) {
//   res.render("musicas/novo", { mensagem: "" });
// });

app.get("/musicas/novo/:mensagem?", function (req, res) {
  Genero.findAll({ order: ["descricao"] }).then(function (genero) {
    if (req.params.mensagem)
      res.render("musicas/novo", {
        mensagem: "Musica Incluida",
        genero: genero,
      });
    else res.render("musicas/novo", { mensagem: "", genero: genero });
  });
});

app.post("/musicas/salvar", function (req, res) {
  let nome = req.body.nome;
  let ano = req.body.ano;
  let artistas = req.body.artistas;
  Musicas.create({
    nome: nome,
    ano: ano,
    artistasId: artistas,
  }).then(res.redirect("/musicas/novo/incluido"));
});
app.listen(3000);
