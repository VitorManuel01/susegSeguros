const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('susegseguros', 'root', 'ASoPEzJsNmCZxoCoPlTGODRZMEYOcpqM', {
    host: 'monorail.proxy.rlwy.net',
    dialect: 'mysql',
    port: '49730',
    logging: console.log,
});

module.exports = sequelize;
