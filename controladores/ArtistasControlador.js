const Artistas = require("../modelos/Artistas");

module.exports = {
    async listar(req, res) {
        try {
            let erro = req.params.mensagem === "erro" ? "Não foi possível excluir o Artista. Verifique se o Artista não está associado a alguma música." : null

            const artistas = await Artistas.findAll({ order: ["id"] });

            if (artistas.length > 0) {
                res.render("artistas/artistas", { mensagem: "", artistas, erro });
            } else {
                res.render("artistas/artistas", {
                    mensagem: "Nenhum artista encontrado, para começar a cadastrar artistas, clique no botão 'Novo Artista'.",
                    artistas,
                    erro
                });
            }
        } catch (error) {
            console.log(error);
            res.render("artistas/artistas", {
                mensagem: "",
                artistas: [],
                erro: "Não foi possível carregar a lista de artistas. Tente novamente mais tarde."
            });
        }
    },
    async novo(req, res) {
        try {
            let mensagem = req.params.mensagem === "incluido" ? "Música cadastrada com Sucesso." : null
            let erro = req.params.mensagem === "erro" ? "Não foi possível cadastrar a música." : null

            res.render("artistas/novo", { mensagem, erro });
        } catch (error) {
            res.render("artistas/novo", { mensagem: '', erro: 'Não foi possível cadastrar a música.' });
        }
    },
    async salvar(req, res) {
        try {
            const { nome, site } = req.body;

            const artista = await Artistas.create({
                nome,
                site
            });

            if (artista)
                res.redirect("/artistas/novo/incluido")
            else
                res.redirect("/artistas/novo/erro")
        } catch (error) {
            res.redirect("/artistas/novo/erro")
        }
    },
    async editar(req, res) {
        const { id, erro } = req.params;

        const artista = await Artistas.findByPk(id);

        res.render("artistas/editar", { artista, mensagem: erro ? 'Não foi possível atualizar o artista.' : null });
    },
    async atualizar(req, res) {
        const { id, nome, site } = req.body;
        await Artistas.update({ nome, site }, { where: { id } });
        res.redirect("/artistas/listar");
    },
    async excluir(req, res) {
        try {
            const { id } = req.params;

            await Artistas.destroy({ where: { id } });

            res.redirect("/artistas/listar");
        } catch (error) {
            res.redirect("/artistas/listar/erro");
        }
    }
}