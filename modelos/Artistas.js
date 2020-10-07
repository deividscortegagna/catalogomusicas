const { Model, DataTypes } = require('sequelize');

class Artistas extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: DataTypes.STRING,
            site: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Musicas,{
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          })
    }
}

module.exports = Artistas;