const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const conexao = require("./bd/conexao");
const Usuarios = require("./bd/Usuarios");
const Genero = require("./bd/Genero");
const Artistas = require("./bd/Artistas");
const Musicas = require("./bd/Musicas");
const formataData = require("./public/js/util");
const bcrypt = require("bcryptjs");
const autorizacao = require("./autorizacao/autorizacao");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(session({ secret: "catalogo", resave: true, saveUninitialized: true }))

conexao.authenticate();

app.get("/", function (req, res) {
  res.render("login", { mensagem: "" });
});

app.get("/index", autorizacao, function (req, res) {
  res.render("index", { usuario: req.session.usuario.nome});
});

app.post("/login", function (req, res) {
  Usuarios.findOne({ where: { login: req.body.login } }).then(function (
    usuario
  ) {
    if (usuario != undefined) {
      if (bcrypt.compareSync(req.body.senha, usuario.senha)) {
        req.session.usuario = { id: usuario.id, nome: usuario.nome, login: usuario.login }
        res.redirect("/index");
      } else res.render("login", { mensagem: "Usuário ou senha inválidos" });
    } else res.render("login", { mensagem: "Usuário ou senha inválidos" });
  });
});

app.get("/logout", function (req, res) {
  req.session.usuario = undefined;
  res.redirect("/");
});



app.get("/usuarios/novo", function (req, res) {
  res.render("usuarios");
});

app.get("/usuarios/cancelar", function (req, res) {
  res.render("login", { mensagem: "" });
});

app.post("/usuarios/salvar", function (req, res) {
  let nome = req.body.nome;
  let login = req.body.login;
  let senha = req.body.senha;

  let salto = bcrypt.genSaltSync(10);
  let senhaCriptografada = bcrypt.hashSync(senha, salto);

  Usuarios.create({ nome, login, senha: senhaCriptografada }).then(
    res.render("login", { mensagem: "Usuário Cadastrado." })
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

app.get("/musicas/lista/:mensagem?", autorizacao, async function (req, res) {
  try {
    const musicas = await Musicas.findAll({
      order: ["titulo"],
      include: [{ model: Artistas }, { model: Genero }],
    });
    if (req.params.mensagem === "incluido") {
      res.render("musicas/musicas", {
        mensagem: "Música cadastrada com Sucesso.",
        musicas,
      });
    } else {
      res.render("musicas/musicas", { mensagem: "", musicas });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/musicas/novo/:mensagem?", async function (req, res) {
  try {
    const artistas = await Artistas.findAll({ order: ["nome"] });
    const generos = await Genero.findAll({ order: ["descricao"] });

    res.render("musicas/novo", { mensagem: "", artistas, generos });
  } catch (error) {
    console.log(error);
  }
});

app.post("/musicas/salvar", function (req, res) {
  let nome = req.body.nome;
  let titulo = req.body.titulo;
  let ano = req.body.ano;
  let artista = req.body.artista;
  console.log("Artista selecionado: ", req.body.artista);
  let genero = req.body.genero;
  Musicas.create({
    nome,
    titulo,
    ano,
    artistaId: artista,
    generoId: genero,
  }).then(res.redirect("/musicas/lista/incluido"));
});

app.get("/musicas/excluir/:id", function (req, res) {
  let id = req.params.id;
  Musicas.destroy({ where: { id: id } }).then(function () {
    res.redirect("/musicas/lista");
  });
});

app.listen(port, () => {
  console.log(`O servidor está rodando http://localhost:${port}`);
});
