const Generos = require("../bd/Generos");
const bcrypt = require("bcryptjs");

module.exports = {
  async excluir (req, res) {
    try {
      const { id } = req.params;

      await Generos.destroy({ where: { id } });
  
      res.redirect("/generos");
    } catch (error) {
      res.redirect("/generos/erro");
    }
  }
}