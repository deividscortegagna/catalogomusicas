const Artistas = require("./../modelos/Artistas");
const Generos = require("./../modelos/Generos");
const Musicas = require("./../modelos/Musicas");

module.exports = {
  async listar (req, res) {
    try {
      const musicas = await Musicas.findAll({
        where: { UsuarioId: req.session.usuario.id },
        order: ["titulo"],
        include: [{ model: Artistas }, { model: Generos }],
      });

      if (musicas.length > 0) {
        res.render("musicas/musicas", { mensagem: "", musicas });
      } else {
        res.render("musicas/musicas", {
          mensagem: "Nenhum música encontrada, para começar a cadastrar músicas, clique no botão 'Nova Música'.",
          musicas,
        });
      }
    
    } catch (error) {
      console.log(error);
    }
  },

  async novo (req, res) {
    try {
      const artistas = await Artistas.findAll({ order: ["nome"] });
      const generos = await Generos.findAll({ order: ["descricao"] });

      let mensagem = req.params.mensagem === "incluido" ? "Música cadastrada com Sucesso." : null
      let erro = req.params.mensagem === "erro" ? "Não foi possível cadastrar a música." : null
  
      res.render("musicas/novo", { artistas, generos, mensagem, erro });
    } catch (error) {
      console.log(error);
    }
  },
  
  async salvar (req, res) {
    try {
      const { nome, titulo, ano, artista, genero } = req.body;
      const usuario = req.session.usuario.id;
  
      const musica = await Musicas.create({
        nome,
        titulo,
        ano,
        ArtistaId: artista,
        GeneroId: genero,
        UsuarioId: usuario
      });

      if (musica)
        res.redirect("/musicas/novo/incluido")
      else 
        res.redirect("/musicas/novo/erro")
    } catch (error) {
      res.redirect("/musicas/novo/erro")
    }    
  },

  async excluir (req, res) {
    const { id } = req.params;
    Musicas.destroy({ where: { id } }).then(function () {
      res.redirect("/musicas/listar");
    });
  },

  async editar (req, res) {
    const { id, erro } = req.params;
    const musica = await Musicas.findByPk(id);
    const artistas = await Artistas.findAll({ order: ["nome"] });
    const generos = await Generos.findAll({ order: ["descricao"] });
    
    res.render("musicas/editar", { musica, artistas, generos, mensagem: erro ? 'Não foi possível atualizar a música.' : ''});
  },

  async atualizar (req, res) {
    try {
      const { id, titulo, ano, artista, genero } = req.body;
      const usuario = req.session.usuario.id;
    
      const retorno = await Musicas.update({
        titulo,
        ano,
        ArtistaId: artista,
        GeneroId: genero,
        UsuarioId: usuario
      }, { where: { id } })
  
      console.log("Retorno: ", retorno )
      
      res.redirect("/musicas/listar");
    } catch (error) {
      res.redirect("/musicas/editar/erro");
    }
  }
}