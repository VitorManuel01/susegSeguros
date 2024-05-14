const Sequelize = require('sequelize')

const sequelize = new Sequelize('smartphone', 'root', 'cimatec', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
});

module.exports = sequelize;