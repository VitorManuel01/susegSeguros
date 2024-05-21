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
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cep: DataTypes.STRING,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    assunto: DataTypes.STRING,
    telefone: DataTypes.STRING,
    mensagemText: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Mensagem',
  });
  return Mensagem;
};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Certifique-se de que o caminho está correto

const Mensagem = sequelize.define('Mensagem', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assunto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mensagemText: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Mensagem;