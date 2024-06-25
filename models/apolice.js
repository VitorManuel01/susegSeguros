'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apolice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apolice.init({
    numeroApolice: DataTypes.STRING,
    dataInicioVigencia: DataTypes.DATE,
    codigoCI: DataTypes.STRING,
    dataEmissao: DataTypes.DATE,
    item: DataTypes.STRING,
    dataFinalVigencia: DataTypes.DATE,
    classeBonus: DataTypes.STRING,
    seguradoNome: DataTypes.STRING,
    seguradoSexo: DataTypes.STRING,
    seguradoRG: DataTypes.STRING,
    seguradoEndereco: DataTypes.STRING,
    seguradoBairro: DataTypes.STRING,
    seguradoCidade: DataTypes.STRING,
    seguradoFoneResidencial: DataTypes.STRING,
    seguradoFoneComercial: DataTypes.STRING,
    seguradoDtNascimento: DataTypes.DATE,
    seguradoCPF: DataTypes.STRING,
    seguradoEstado: DataTypes.STRING,
    seguradoCEP: DataTypes.STRING,
    seguradoCelular: DataTypes.STRING,
    seguradoEmail: DataTypes.STRING,
    veiculoNome: DataTypes.STRING,
    veiculoCodigoFIPE: DataTypes.STRING,
    veiculoAno: DataTypes.STRING,
    veiculoModelo: DataTypes.STRING,
    veiculoCombustivel: DataTypes.STRING,
    veiculoCapacidade: DataTypes.STRING,
    veiculoPortas: DataTypes.STRING,
    veiculoCambioAutomatico: DataTypes.STRING,
    veiculoChassis: DataTypes.STRING,
    veiculoPlaca: DataTypes.STRING,
    veiculoRenavam: DataTypes.STRING,
    veiculoAlienado: DataTypes.STRING,
    veiculoUso: DataTypes.STRING,
    veiculoCategoriaTarifaria: DataTypes.STRING,
    nomeCorretor: DataTypes.STRING,
    susepOficial: DataTypes.STRING,
    susepSeguradora: DataTypes.STRING,
    telefoneCorretora: DataTypes.STRING,
    emailCorretora: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Apolice',
  });
  return Apolice;
};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Certifique-se de que o caminho está correto

const Apolice = sequelize.define('Apolice', {
  numeroApolice: {
      type: DataTypes.STRING,
      allowNull: false
  },
  dataInicioVigencia: {
      type: DataTypes.DATE,
      allowNull: false
  },
  codigoCI: {
      type: DataTypes.STRING,
      allowNull: true
  },
  dataEmissao: {
      type: DataTypes.DATE,
      allowNull: false
  },
  item: {
      type: DataTypes.STRING,
      allowNull: false
  },
  dataFinalVigencia: {
      type: DataTypes.DATE,
      allowNull: false
  },
  classeBonus: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoNome: {
      type: DataTypes.STRING,
      allowNull: false
  },
  seguradoSexo: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoRG: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoEndereco: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoBairro: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoCidade: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoFoneResidencial: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoFoneComercial: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoDtNascimento: {
      type: DataTypes.DATE,
      allowNull: true
  },
  seguradoCPF: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoEstado: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoCEP: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoCelular: {
      type: DataTypes.STRING,
      allowNull: true
  },
  seguradoEmail: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoNome: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoCodigoFIPE: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoAno: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoModelo: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoCombustivel: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoCapacidade: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoPortas: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoCambioAutomatico: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoChassis: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoPlaca: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoRenavam: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoAlienado: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoUso: {
      type: DataTypes.STRING,
      allowNull: true
  },
  veiculoCategoriaTarifaria: {
      type: DataTypes.STRING,
      allowNull: true
  },
  nomeCorretor: {
      type: DataTypes.STRING,
      allowNull: true
  },
  susepOficial: {
      type: DataTypes.STRING,
      allowNull: true
  },
  susepSeguradora: {
      type: DataTypes.STRING,
      allowNull: true
  },
  telefoneCorretora: {
      type: DataTypes.STRING,
      allowNull: true
  },
  emailCorretora: {
      type: DataTypes.STRING,
      allowNull: true
  }
}, {
  sequelize,
  modelName: 'Apolice',
});

module.exports = Apolice;
