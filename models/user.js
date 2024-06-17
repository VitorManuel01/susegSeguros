'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    role: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isIntern: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isIntern: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
});


module.exports = User;