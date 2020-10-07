const Generos = require("../modelos/Generos");

module.exports = {
  async listar(req, res) {
    try {
      let erro = req.params.mensagem === "erro" ? "Não foi possível excluir o Gênero. Verifique se o Gênero Musical não está associado a alguma música." : null

      const generos = await Generos.findAll({ order: ["id"] });

      if (generos.length > 0) {
        res.render("generos/generos", { mensagem: "", generos, erro });
      } else {
        res.render("generos/generos", {
          mensagem: "Nenhum gênero musical encontrado, para começar a cadastrar gêneros musicais, clique no botão 'Novo Gênero Musical'.",
          generos,
          erro
        });
      }
    } catch (error) {
      console.log(error);
      res.render("generos/generos", {
        mensagem: "",
        generos: [],
        erro: "Não foi possível carregar a lista de gêneros musicais. Tente novamente mais tarde."
      });
    }
  },
  async novo(req, res) {
    try {
      let mensagem = req.params.mensagem === "incluido" ? "Gênero Musical cadastrado com Sucesso." : null
      let erro = req.params.mensagem === "erro" ? "Não foi possível cadastrar o Gênero Musical." : null

      res.render("generos/novo", { mensagem, erro });
    } catch (error) {
      res.render("generos/novo", { mensagem: '', erro: 'Não foi possível cadastrar a Gênero Musical.' });
    }
  }, async salvar(req, res) {
    try {
      const { descricao } = req.body;

      const genero = await Generos.create({
        descricao
      });

      if (genero)
        res.redirect("/generos/novo/incluido")
      else
        res.redirect("/generos/novo/erro")
    } catch (error) {
      res.redirect("/generos/novo/erro")
    }
  },
  async editar(req, res) {
    const { id, erro } = req.params;

    const genero = await Generos.findByPk(id);

    res.render("generos/editar", { genero, mensagem: erro ? 'Não foi possível atualizar o gênero musical.' : null });
  },
  async atualizar(req, res) {
    const { id, descricao } = req.body;

    try {
      await Generos.update({ descricao }, { where: { id } });
      res.redirect("/generos/listar");
    } catch {
      res.redirect("/generos/editar/" + id + "/erro");
    }
  },
  async excluir(req, res) {
    try {
      const { id } = req.params;

      await Generos.destroy({ where: { id } });

      res.redirect("/generos/listar");
    } catch (error) {
      res.redirect("/generos/listar/erro");
    }
  }
}