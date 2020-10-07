const Generos = require("../bd/Generos");
const bcrypt = require("bcryptjs");

module.exports = {
  async listar (req, res) {    
    let erro = req.params.mensagem === "erro" ? "Não foi possível excluir o gênero." : null
  
    Genero.findAll({ order: ["id"] }).then(function (genero) {
      res.render("generos/generos", { genero: genero, erro });
    });
  },
  async excluir (req, res) {
    try {
      const { id } = req.params;

      await Generos.destroy({ where: { id } });
  
      res.redirect("/generos/listar");
    } catch (error) {
      res.redirect("/generos/listar/erro");
    }
  }
}