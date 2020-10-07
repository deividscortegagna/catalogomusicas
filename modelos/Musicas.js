const { Model, DataTypes } = require('sequelize');

class Musicas extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titulo: DataTypes.STRING,
            ano: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Artistas);
        this.belongsTo(models.Generos);
        this.belongsTo(models.Usuarios);
    }
}

module.exports = Musicas;