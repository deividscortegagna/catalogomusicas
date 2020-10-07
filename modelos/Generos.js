const { Model, DataTypes } = require('sequelize');

class Generos extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            }
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Musicas)
    }
}

module.exports = Generos;