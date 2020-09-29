const Usuarios = require("./../bd/Usuarios");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    return res.render("login", { mensagem: "" });
  },

  async home(req, res) {
    return res.render("home", { usuario: req.session.usuario.nome});
  },

  async login(req, res) {
    // Atribuição por desestruturação.
    const { login, senha} = req.body;

    const usuario = await Usuarios.findOne( { where: { login }});

    if(!usuario)
      return res.render("login", { mensagem: "Usuário ou senha inválidos" });

    if(bcrypt.compareSync(senha, usuario.senha)) {
      req.session.usuario = { id: usuario.id, nome: usuario.nome, login: usuario.login }
      return res.redirect("/home");
    } else {
      return res.render("login", { mensagem: "Usuário ou senha inválidos" });
    }
  },

  async logout(req, res) {
    req.session.usuario = undefined;
    return res.redirect("/");
  }
}