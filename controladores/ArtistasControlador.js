const Artistas = require("../bd/Artistas");
const bcrypt = require("bcryptjs");


module.exports = {
    async excluir (req, res) {
        try {
            const { id } = req.params;

            await Artistas.destroy({ where: { id } });

            res.redirect("/artistas");
        }   catch (error) {
            res.redirect("/artistas/erro");
        }
    }
}