const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'WZKtufAhNUwJzkLyJWAVPVTMTrEOQEOq', {
    host: 'roundhouse.proxy.rlwy.net',
    dialect: 'mysql',
    port: '39955',
    
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
