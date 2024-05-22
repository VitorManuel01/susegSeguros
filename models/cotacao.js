'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cotacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cotacao.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    opcaoVeiculo: DataTypes.STRING,
    estadoCivil: DataTypes.STRING,
    dtNascimento: DataTypes.DATE,
    cep: DataTypes.STRING,
    placa: DataTypes.STRING,
    chassis: DataTypes.STRING,
    documento: DataTypes.STRING,
    marcaNome: DataTypes.STRING,
    marcaCodigo: DataTypes.STRING,
    modeloNome: DataTypes.STRING,
    modeloCodigo: DataTypes.STRING,
    anoNome: DataTypes.STRING,
    anoCodigo: DataTypes.STRING,
    possuiSeguro: DataTypes.STRING,
    possuiGaragem: DataTypes.STRING,
    isZeroKm: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cotacao',
  });
  return Cotacao;
};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Certifique-se de que o caminho está correto

const Cotacao = sequelize.define('Cotacao', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    opcaoVeiculo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estadoCivil: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dtNascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chassis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false
  },
    marcaNome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marcaCodigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modeloNome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modeloCodigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anoNome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anoCodigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    possuiSeguro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    possuiGaragem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isZeroKm: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Cotacao',
});

module.exports = Cotacao;