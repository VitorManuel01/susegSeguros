'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cotacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      opcaoVeiculo: {
        type: Sequelize.STRING
      },
      estadoCivil: {
        type: Sequelize.STRING
      },
      dtNascimento: {
        type: Sequelize.DATE
      },
      cep: {
        type: Sequelize.STRING
      },
      placa: {
        type: Sequelize.STRING
      },
      chassis: {
        type: Sequelize.STRING
      },
      marcaNome: {
        type: Sequelize.STRING
      },
      marcaCodigo: {
        type: Sequelize.STRING
      },
      modeloNome: {
        type: Sequelize.STRING
      },
      modeloCodigo: {
        type: Sequelize.STRING
      },
      anoNome: {
        type: Sequelize.STRING
      },
      anoCodigo: {
        type: Sequelize.STRING
      },
      possuiSeguro: {
        type: Sequelize.STRING
      },
      possuiGaragem: {
        type: Sequelize.STRING
      },
      isZeroKm: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cotacaos');
  }
};