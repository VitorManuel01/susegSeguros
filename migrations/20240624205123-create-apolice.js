'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apolice', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroApolice: {
        type: Sequelize.STRING
      },
      dataInicioVigencia: {
        type: Sequelize.DATE
      },
      codigoCI: {
        type: Sequelize.STRING
      },
      dataEmissao: {
        type: Sequelize.DATE
      },
      item: {
        type: Sequelize.STRING
      },
      dataFinalVigencia: {
        type: Sequelize.DATE
      },
      classeBonus: {
        type: Sequelize.STRING
      },
      seguradoNome: {
        type: Sequelize.STRING
      },
      seguradoSexo: {
        type: Sequelize.STRING
      },
      seguradoRG: {
        type: Sequelize.STRING
      },
      seguradoEndereco: {
        type: Sequelize.STRING
      },
      seguradoBairro: {
        type: Sequelize.STRING
      },
      seguradoCidade: {
        type: Sequelize.STRING
      },
      seguradoFoneResidencial: {
        type: Sequelize.STRING
      },
      seguradoFoneComercial: {
        type: Sequelize.STRING
      },
      seguradoDtNascimento: {
        type: Sequelize.DATE
      },
      seguradoCPF: {
        type: Sequelize.STRING
      },
      seguradoEstado: {
        type: Sequelize.STRING
      },
      seguradoCEP: {
        type: Sequelize.STRING
      },
      seguradoCelular: {
        type: Sequelize.STRING
      },
      seguradoEmail: {
        type: Sequelize.STRING
      },
      veiculoNome: {
        type: Sequelize.STRING
      },
      veiculoCodigoFIPE: {
        type: Sequelize.STRING
      },
      veiculoAno: {
        type: Sequelize.STRING
      },
      veiculoModelo: {
        type: Sequelize.STRING
      },
      veiculoCombustivel: {
        type: Sequelize.STRING
      },
      veiculoCapacidade: {
        type: Sequelize.STRING
      },
      veiculoPortas: {
        type: Sequelize.STRING
      },
      veiculoCambioAutomatico: {
        type: Sequelize.STRING
      },
      veiculoChassis: {
        type: Sequelize.STRING
      },
      veiculoPlaca: {
        type: Sequelize.STRING
      },
      veiculoRenavam: {
        type: Sequelize.STRING
      },
      veiculoAlienado: {
        type: Sequelize.STRING
      },
      veiculoUso: {
        type: Sequelize.STRING
      },
      veiculoCategoriaTarifaria: {
        type: Sequelize.STRING
      },
      nomeCorretor: {
        type: Sequelize.STRING
      },
      susepOficial: {
        type: Sequelize.STRING
      },
      susepSeguradora: {
        type: Sequelize.STRING
      },
      telefoneCorretora: {
        type: Sequelize.STRING
      },
      emailCorretora: {
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
    await queryInterface.dropTable('Apolice');
  }
};