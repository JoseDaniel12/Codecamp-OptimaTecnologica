const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.SQL_SERVER_DATABASE,
    process.env.SQL_SERVER_USER,
    process.env.SQL_SERVER_PASSWORD,
    {
        host: process.env.SQL_SERVER_HOST,
        port: process.env.SQL_SERVER_PORT,
        dialect: 'mssql',
        logging: false,
        dialectOptions: {
            options: {
                encrypt: false
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
