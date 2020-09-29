const Artistas = require("./../bd/Artistas");
const Generos = require("./../bd/Generos");
const Musicas = require("./../bd/Musicas");

module.exports = {
  async listar(req, res) {
    try {
      const musicas = await Musicas.findAll({
        where: { usuarioId: req.session.usuario.id },
        order: ["titulo"],
        include: [{ model: Artistas }, { model: Generos }],
      });
  
      console.log("Musicas: ", musicas)
  
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
  }
}