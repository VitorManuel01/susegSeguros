'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mensagem.init({
    nomeCompleto: DataTypes.STRING,
    email: DataTypes.STRING,
    cep: DataTypes.STRING,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    assunto: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mensagem',
  });
  return Mensagem;
};