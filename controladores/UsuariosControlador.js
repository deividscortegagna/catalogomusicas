const Usuarios = require("./../bd/Usuarios");
const bcrypt = require("bcryptjs");

module.exports = {
  async novo(req, res) {
    return res.render("usuarios", { mensagem: "" });
  },

  async salvar(req, res) {
    try {
      const { nome, login, senha } = req.body;

      let salto = bcrypt.genSaltSync(10);
      let senhaCriptografada = bcrypt.hashSync(senha, salto);

      const usuario = await Usuarios.create({ nome, login, senha: senhaCriptografada });

      if(usuario) 
        return res.render("login", { mensagem: "Usuário Cadastrado." , erro: ""});
      else {
        return res.render("usuarios", { mensagem: "Não foi possível cadastrar o usuário." })
      }
    } catch (error) {
      if( error.name === 'SequelizeUniqueConstraintError' ) 
        return res.render("usuarios", { mensagem: "Não foi possível cadastrar o usuário, o e-mail já está associado a um usuário existente." })
      else
        return res.render("usuarios", { mensagem: "Não foi possível cadastrar o usuário." })
    }
  }
}