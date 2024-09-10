const { Sequelize } = require('sequelize');
const cls = require('cls-hooked');

const namespace = cls.createNamespace('codecamp');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(
    process.env.SQL_SERVER_DATABASE,
    process.env.SQL_SERVER_USER,
    process.env.SQL_SERVER_PASSWORD,
    {
        host: process.env.SQL_SERVER_HOST,
        port: process.env.SQL_SERVER_PORT,
        dialect: 'mssql',
        logging: false,
        timezone: '-06:00', // Zona horaria de Guatemala (UTC-6)
        dialectOptions: {
            options: {
                encrypt: false,
                useUTC: false,
                dateFirst: 1
            }
        },
    }
);

(async function testDbConnection() {
    try {
        await sequelize.authenticate();
        console.log('SqlServer connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the SqlServer database: \n', error);
    }
})();

module.exports = sequelize;
