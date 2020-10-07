const { Model, DataTypes } = require('sequelize');

class Usuarios extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: DataTypes.STRING,
            login: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            senha: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Musicas)
    }
}

module.exports = Usuarios;