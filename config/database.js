const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('susegseguros', 'root', 'ASoPEzJsNmCZxoCoPlTGODRZMEYOcpqM', {
    host: 'monorail.proxy.rlwy.net',
    dialect: 'mysql',
    port: '49730',
    
    // configuração necessária para evitar o erro ECONNRESET
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: console.log,
});

module.exports = sequelize;
